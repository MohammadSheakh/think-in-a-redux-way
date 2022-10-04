import io from "socket.io-client";
import { apiSlice } from "../api/apiSlice";
import { messagesApi } from "../messages/messagesApi";

// database er  conversation node e jodi amra hit kori .. tahole amra  API ta functional korte pari ..
// Prothom kaj hocche conversationsApi File e amader ke API likhte hobe ..

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // eta jehetu ekta object return kore .. so, ei jayga ta te ami amar prothom end point ta likhbo
        getConversations: builder.query({
            // query jei jinish ta .. sheta amake ekta query function amake ekhane dite hobe ..
            query: (email) =>
                /**
                 * proyojonio kono argument jodi thake .. tahole sheta nite hobe ..
                 * ekhon amra jokhon conversation anbo .. jei user logged in hoye ase .. tar Email Id kintu amar
                 * lagbe .. karon oi Email er shathe Match kore .. joto gula Conversation ami pabo .. shegula
                 * ami ekhane niye ashbo
                 */
                // amra jani ei jayga theke amader ke ekta URL return kore dite hoy ..
                // so, shekhan e amra /conversations ... ei node e amra hit korbo .. amra jani "participants" nam e ekta
                // node ase amader database e .. shei NODE e amra LIKE SEARCH korbo .. so shekhan e USER er jei email ta
                // ase ..sheta to ami peye jacchi logged in user er kas theke .. shei EMAIL er upor base kore amra kintu
                // LIKE Search korte pari .. tahole ami likhbo "participants_like=${email}" tahole oi user er shathe jar
                // jar conversation ase .. shegula chole ashbe .. amra ek e shathe chacchi je .. jinish ta jeno latest
                // hoye ashe .. mane latest jinish diye jeno sort hoye ashe .. shob cheye last e jei conversation ta
                // create hoyeche .. mane sheta shobar upor e thakbe .. mane timeStamp jeta rekhechi .. shei timeStamp
                // diye amake sort korte hobe .. tahole JSON Place Holder e .. ami ekhane Second Query Parameter dicchi
                // "&" and ekhane "&_sort" nam e tar ekta filter ase ..and amra timestamp diye korte chacchi ..
                // _order=desc ekta order bole dite hoy.. amar dorkar .. date ta shob cyeye boro jeta .. sheta .. mane latest
                // ta dorkar amar ..desending order .. amra jehtu pagenate korbo .. pagenation korbo .. amra per page e 5 tar
                // beshi ante chacchi na .. "github.com/typicode/json-server" ei link theke porte hobe
                // _page=1&_limit= koto number page ami chai.. and per page e koyta kore chai .. sheta ami bole dite pari
                `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
            transformResponse(apiResponse, meta) {
                const totalCount = meta.response.headers.get("X-Total-Count");
                return {
                    data: apiResponse,
                    totalCount,
                };
            },
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                // create socket
                const socket = io("http://localhost:9000", {
                    reconnectionDelay: 1000,
                    reconnection: true,
                    reconnectionAttemps: 10,
                    transports: ["websocket"],
                    agent: false,
                    upgrade: false,
                    rejectUnauthorized: false,
                });

                try {
                    await cacheDataLoaded;
                    socket.on("conversation", (data) => {
                        updateCachedData((draft) => {
                            const conversation = draft.data.find(
                                (c) => c.id == data?.data?.id
                            );

                            if (conversation?.id) {
                                conversation.message = data?.data?.message;
                                conversation.timestamp = data?.data?.timestamp;
                            } else {
                                // do nothing
                            }
                        });
                    });
                } catch (err) {}

                await cacheEntryRemoved;
                socket.close();
            },
        }),
        getMoreConversations: builder.query({
            query: ({ email, page }) =>
                `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=${page}&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
            async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
                try {
                    const conversations = await queryFulfilled;
                    if (conversations?.data?.length > 0) {
                        // update conversation cache pessimistically start
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getConversations",
                                email,
                                (draft) => {
                                    return {
                                        data: [
                                            ...draft.data,
                                            ...conversations.data,
                                        ],
                                        totalCount: Number(draft.totalCount),
                                    };
                                }
                            )
                        );
                        // update messages cache pessimistically end
                    }
                } catch (err) {}
            },
        }),
        getConversation: builder.query({
            query: ({ userEmail, participantEmail }) =>
                `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
        }),
        addConversation: builder.mutation({
            query: ({ sender, data }) => ({
                url: "/conversations",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const conversation = await queryFulfilled;
                if (conversation?.data?.id) {
                    // silent entry to message table
                    const users = arg.data.users;
                    const senderUser = users.find(
                        (user) => user.email === arg.sender
                    );
                    const receiverUser = users.find(
                        (user) => user.email !== arg.sender
                    );

                    dispatch(
                        messagesApi.endpoints.addMessage.initiate({
                            conversationId: conversation?.data?.id,
                            sender: senderUser,
                            receiver: receiverUser,
                            message: arg.data.message,
                            timestamp: arg.data.timestamp,
                        })
                    );
                }
            },
        }),
        editConversation: builder.mutation({
            query: ({ id, data, sender }) => ({
                url: `/conversations/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // optimistic cache update start
                const pathResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getConversations",
                        arg.sender,
                        (draft) => {
                            const draftConversation = draft.data.find(
                                (c) => c.id == arg.id
                            );
                            draftConversation.message = arg.data.message;
                            draftConversation.timestamp = arg.data.timestamp;
                        }
                    )
                );
                // optimistic cache update end

                try {
                    const conversation = await queryFulfilled;
                    if (conversation?.data?.id) {
                        // silent entry to message table
                        const users = arg.data.users;
                        const senderUser = users.find(
                            (user) => user.email === arg.sender
                        );
                        const receiverUser = users.find(
                            (user) => user.email !== arg.sender
                        );

                        const res = await dispatch(
                            messagesApi.endpoints.addMessage.initiate({
                                conversationId: conversation?.data?.id,
                                sender: senderUser,
                                receiver: receiverUser,
                                message: arg.data.message,
                                timestamp: arg.data.timestamp,
                            })
                        ).unwrap();

                        // update messages cache pessimistically start
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getMessages",
                                res.conversationId.toString(),
                                (draft) => {
                                    draft.push(res);
                                }
                            )
                        );
                        // update messages cache pessimistically end
                    }
                } catch (err) {
                    pathResult.undo();
                }
            },
        }),
    }),
});

export const {
    useGetConversationsQuery,
    useGetConversationQuery,
    useAddConversationMutation,
    useEditConversationMutation,
} = conversationsApi; // she amake hook gula baniye diyeche
// ei hook gula amra component theke call korte parbo .. and shekhan e she amader ke
// endpoint function  ta diye dibe .. evabe UI te amra API ke functional korte parbo
