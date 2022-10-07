import io from "socket.io-client";
import { apiSlice } from "../api/apiSlice";
import { messagesApi } from "../messages/messagesApi"; // jehetu default export na .. export const .. tai import korar shomoy {} diye nite hobe

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
        // 1. ekhon ami conversation API te chole jai .. amar prothom kaj hocche , amake ekta single conversation
        //niye ashte hobe ..   mane jokhon e ekta user er email address diye search kora hobe .. tokhon e ami request
        // kore dekhe nibo .. oi user er shathe .. jei user logged in asen .. tar kono conversation ase kina ..
        getConversation: builder.query({
            // jei user logged in hoye asen.. shei user er email lagbe .. arekta hocche jei user ke message pathate
            // chacchen tar email lagbe
            // conversations node e hit korbo
            query: ({ userEmail, participantEmail }) =>
                `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
        }),
        addConversation: builder.mutation({
            // ebar hocche mutation
            query: ({ sender, data }) => ({
                // mutation jehetu tai amra ekta object return kore dibo ..
                url: "/conversations",
                method: "POST",
                body: data,
            }),
            /**
             *
             * both khetrei ekta jinish common , jokhon e kono conversation add ba edit hobe .. tar mane definitely
             *  thik tar porei .. message entry kintu hobe .. silently diye dite hobe .. ei kaj ta conversation add
             *  ba edit .. duitar shathei shomporkito..  easy upay e kaj ta kivabe korte pari ? UI te change na
             *  koreo amra kaj ta kivabe korte pari .. amader Conversation API jeta ase .. oi khane amar end point
             *  gula likha ase .. addConversation and editConversation function likha ase .. ekta jokhon ghote jabe
             *  ..  thik porei .. ami ashole message table e silently ekta entry diye dibo .. thik ase .. so, shei
             *  kaj ta amra kivabe korte pari ? amra ei khanei korte pari .. amader UI te to kichu korar dorkar nai
             *  .. so, ei query ke jodi ami porjobekkhon korte chai  and shetar promise shesh hole ekta kaj korbo ..
             *  erokom korte gele .. amra ekhanei async onQueryStarted ... ei nam e amra ekta function niye chilam
             * .. shekhane e amra parameter hishebe args pai ar ekta object er moddhe queryFulfilled ar dispatch ..
             * . ei duita jinish amra pai .. 😛 so ei jayga theke erokom ekta async function diye dite hoy ..
             * eita kokhon call hoy ? jei addConversation function call kora hoyeche .. mane query start hoyeche
             * tokhon e call hoy... addConversation successfully houar pore amader kaj hocche ,return e response e
             *  amra kintu ekta conversation ID pai .. jodi successfully hoy tar mane oi conversation ID ta must
             * ashbe .. oi conversation Id ta paowar pore amra aste kore amader message table e , Message e to amar
             * API likhai ase .. add Message korar .. sheta call kore dibo .. sheta jodi ami listen korte chai ..
             * tahole queryFulfilled jei Promise ta .. ekhane tahole conversation ta pabo .. ei 😀 promise tar jonno
             * amra Await korbo ..Await successfull hoye gele ..jodi amader conversation er id jodi thake
             * tar mane amar ei request ta successfull hoyeche ..
             */
            // arg er moddhe amra { sender, data } object ta pai
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // queryFulfilled nam e ekta promise amra pai ekhan theke
                const conversation = await queryFulfilled;
                if (conversation?.data?.id) {
                    // silent entry to message table // er pore amar kaj hocche ei jaygay message table e insert kora
                    /**
                     * amader sender user dui jon e ber kora lagbe .. // je logged in user .. shei kintu sender ..
                     * sheta amader ekhane chole ashse .. abar amader kase users er data o ashse .. amra
                     * duijon user er moddhe sender ke bad dilei receiver ke peye jabo .. jehetu amader identify kora lagbe
                     */
                    const users = arg.data.users; //😀karon oi pash theke Modal.js theke data ta ekta object hishebe ashse ..shekhan e users er moddhe dui jon er email e ase
                    const senderUser = users.find(
                        (user) => user.email === arg.sender // sender to ami jani.. karon sheta alada kore ashse
                    );
                    const receiverUser = users.find(
                        // array er find method
                        (user) => user.email !== arg.sender
                    );
                    /**
                     * dispatch mode e .. jevabe amra manually hook chara korte pari . shei jinish tai amader ke
                     * korte hobe ..tahole amake jeta korte hoeb messageApi theke endpoints er addMessage function
                     * ba endpoint er initiate function call korte pari .. er moddhe parameter e object akare
                     * ja ja she chay , shegula pass kore dite pari ..
                     */
                    dispatch(
                        messagesApi.endpoints.addMessage.initiate({
                            // full message body ta .. ta ke amake diye dite hoy .. ekhon amake database e jete hobe .. and dekhte hobe .. ekta message body er chehara kemon
                            conversationId: conversation?.data?.id,
                            sender: senderUser,
                            receiver: receiverUser,
                            message: arg.data.message,
                            timestamp: arg.data.timestamp,
                        })
                        // shob kichu thik thakle message table e entry hoye jaowar kotha ..
                    );
                }
            },
        }),
        editConversation: builder.mutation({
            // definately kono ekta conversation id .. amader paramter e ashbe ..
            query: ({ id, data, sender }) => ({
                // jehetu amra ek tai paramter receive korte pari .. tai amra ekta object niye nilam
                // jar moddhe onek gula jinish receive korte pari .. jei jei jinish gula change korte
                // chai .. shegulao nite hobe .. sheta ke data boltesi
                url: `/conversations/${id}`,
                method: "PATCH", // edit er jonno PATCH boltesi
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
                    // 😀 conversation.data er moddhe jinish thake ..
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
