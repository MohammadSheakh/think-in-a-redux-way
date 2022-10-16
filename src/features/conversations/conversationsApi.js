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
            /**😅😅 Infinity Scroll er jonno response er header ta ke amar modify korte 
                     * hobe .. ami response ta ke modify kore ..
                     * prothom .. 5 tar moddhei kintu she amake total count diye dey .. so, shekhan
                     * theke amake read kore nilei hobe .. getConversations er jei response dey 
                     * response ta ke modify korte hobe ..she amake data ta diye dey
                     *   she ekta array of object dey
                     * 
                     * ami transformResponse() nam e ekta function nite pari .. 
                     */
                transformResponse(apiResponse, meta) {
                    /**ei function er moddhe ami response ta ke transform korte parobo .. 
                     * tar mane definately she amake ekhane response ta diye dibe ... jei response
                     * ta she pathabe .. sheta ami apiResponse er moddhe peye jai .. ar Request er
                     * meta value gula .. mane request er header and onnano jinish pati .. shegula o 
                     * ei meta er moddhe thake .. 
                     */
                // ami koyta kore data anchi .. sheta jani .. ami jodi 5 ta kore data ani .. taile response er headers er 
                // moddhe jei X-Total-Count ase .. sheta ke ami 5 diye vag korbo .. shetar floor result hobe .. koyta 
                // page minimum ... jokhon e page number 4 hoye jabe .. tokhon amra ar infinite scrool korbo na .. eta
                // hocche amar so far plan .. 
                // amra first page anlam .. er pore jokhon new page anbo .. ager ene fela page gula kintu re-validate korchi
                // na amra .. amra kintu ebar performance onujayi kaj korchi .. last 5 ta chole esheche .. er pore tar thik 
                // ager 5 ta chole ashbe .. sorted hoye ..  porer chunk e tar ager 5 ta ashbe .. jegula jegula ashse .. amra 
                // jeta korbo .. full list ta invalid na kore .. again .. already theke jaowa jei cash .. shei cash er moddhe
                // amra push kore dibo .. amar ja ase .. tar shathe ami concatinate kore dibo  
                // new page er data anar jonno same API duibar call korle .. ager cash remove hoye / replace hoye new data 
                // chole ashbe .. append kintu hobe na .. append kivabe kora jete pare .. amader ager cash ta ke dhore rakhte
                // hobe .. tar shathe new API call er cash .. append kore dite hobe .. 
                const totalCount = meta.response.headers.get("X-Total-Count");
                // return apiResponse; // ekhon ami modify kore dibo response ta .. // apiResponse ta chilo 
                // array of object ta ... 
                return {
                    // nijer moto ekta notun object dibo .. tar data er moddhe array of object ta vore dibo .. 
                    data: apiResponse,
                    totalCount, // first time ei kintu ami total count ta peye jacchi .. 
                    /**
                     * ei change er karon e amar ekhon onek jaygay change hobe .. age ami ChatItems Component er
                     * moddhe data ta petam .. shetai conversations chilo .. ekhon kintu eta ekta array of object
                     * na .. eta ekhon shora shori ekta object .. tar data er moddhe jinish ta ase .. 
                     */
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
        // new page er data anar jonno amra new API banacchi 
        getMoreConversations: builder.query({
            // get more conversations hocche "getConversations" er assistant shudhu more data anar jonno  .. 
            // ami UI te dekhacchi kintu  "getConversations" er cash .. 
            query: ({ email, page }) =>
            // koto number page er jonno data anbo .. shetao amra input hishebe nicchi .. 
                `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=${page}&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
            // 😀😀 ekhane onCacheEntryAdded async function ta lagbe na .. jokhon amar data chole ashbe .. tokhon amar 
            // "getConversations" er cash update korte hobe .. 
                async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
                    // 😀 optimistic cash update ekhane kora lagbe na ..  // arg er moddhe amra email ar page ta pai .. destructure kore ber kore nilam .. 
                try {
                    const conversations = await queryFulfilled; // new conversations paowar pore .. ami draft e concatinate kore dibo .. 
                    if (conversations?.data?.length > 0) { // new jei chunk ta .. shekhan e aro 5 ta thakbe .. 
                        // 😅 amar data ashar pore kaj kora lagbe .. so, pissimistically kora lagbe .. 
                        // update conversation cache pessimistically start
                        // 😀 ami message table e silent entry diyechilam.. sheta amar dorkar nai ... 
                        dispatch(
                            apiSlice.util.updateQueryData(
                                // jokhon e data pabo .. tokhon "getConversations" API er cash update kore felbo .. 
                                "getConversations",
                                email, // getConversations er cash ta email diye identify hobe .. 
                                (draft) => { // ei draft er moddhe first page er chunk ta diye dibe .. 
                                    // draft.push(res);  // 😀 draft er moddhe push na ei khetre .. 
                                    // ami new ekta array of object .. amake kintu draft er shathe concatinate korte hobe
                                    // amake ekta new array return korte hobe .. sekhan e ami draft e ja chilo .. sheta 
                                    // to ami diboi .. tar shathe shathe conversations er data tao spread kore dibo 
                                    /** 😅 draft ta ke print korte hole amake stringify kore nite hobe ..  */
                                    return {
                                        data: [
                                            ...draft.data, // ager data er shathe 
                                            ...conversations.data, // new data append kore dilam .. 
                                        ], // array of object er moddhe concatinate kore dicchi .. 
                                        totalCount: Number(draft.totalCount), // draft theke niye kaj kortesi
                                        // tai number kore dite hobe .. karon string chilo 
                                    };
                                }
                            )
                        );
                        // update messages cache pessimistically end
                    }
                } catch (err) {
                    // undo() korar kichu nai .. karon ami pissimistically korchi .. 
                    // response na ashle .. hobei na ashole .. 
                }
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
                // client side optimistic cache update start // jokhon query shuru hocche tokhon e korbo
                // query shuru hoyeche .. ekhono kintu fulfilled hoy nai .. ami chaile queryFulfilled er poreo kaj ta korte pari
                // sheta ar optimistic hobe na .. sheta hobe pessimistic .. optimistic mane .. ami agei local cash ta update korbo ..
                // ekhon client side cash update korte chaile .. amar ekta😀utility function lagbe .. naile cash ta ami update korbo
                // kivabe ..cash er control ta ami pabo kivabe .. shetar jonno she ekta utility function diye diyeche .. sheta amra
                // use korbo .. apiSlice.util.updateQueryData() ei nam e tar ekta function ase .. ei function ta call korle .. ei
                // function er maddhome client side cash ta amra update korte parbo .. Client Side e onek gula route er e cash ase ..
                // jemon Conversation list er jonno corresponding cash .. sheta ase .. abar messages pathate .. messages list dekhanor
                // jonno jei cash ta .. shetar ekta data .. mane cash ase .. so, oi kon cash ta ami update korbo, sheta ami bujhbo ki
                // kore .. sheta bojhar jonno amake she option diye diyeche .. first parameter e ami bolbo .. amar kon API ta ami
                // update korbo .. to ami jokhon ei kaj ta korbo .. tokhon ami ashole kaj korte chacchi ki ..ami Conversation list
                // er cash ta update korte chacchi .. ei cash er corresponding endpoint konta ? getConversations endpoint..
                // tahole ami first parameter e sheta bole dibo ..and 2nd parameter e .. getConversations kintu onek vabe hote pare ..
                // jemon bivinno argument ase .. different different argument er jonno kintu different different cash ..
                // email jodi parameter hishebe ashe .. shetai to amra arg e pacchi ..so, prottek ta email er jonno alada cash thakbe
                // so, oi cash ta ke identify korar jonno shudhu kintu .. "getConversations", ei tuku kintu enough na .. er argument
                // tao ashole amar lagbe ..getConversations endpoint function er argument hocche email .. ekhon ei endpoint function
                // mane editConversation() endpoint function er moddhe email ta ami pabo kivabe ? eta ekhane amar arg.sender er moddhe
                // ase .. logged in user er email ta .. 3rd parameter e she actually amake ekta callback function dey .. shei callback
                // function er moddhe amra draft state ta pai .. draft mane ki .. amra EMER use korechilam .. apnader mone ase ..
                // shei draft ta ke kintu amra manually muted korte pari .. she jehetu in the back-end EMER use kore .. ejonno she
                // amake draft state dibe .. ei draft ta hocche amar actually getConversations() bam pasher jei API ta ase .. endpoint
                // ta ase .. shei endpoint er .. jehetu ami sumit diye login kore achi .. ei khetre sumit .. tar mane ..
                // getConversations() e sumit diye jei cash tar.. corresponding jinish ta amra ekhon draft e peye giyechi ..
                // etar structure ta amra jani hocche array of conversations arki .. amra jehetu ekhon draft er moddhe array of conversations
                // ta peye giyechi .. so , shei draft ta ke amar ekhon change korte hobe .. amar kaj hocche , ekhon jehetu eita edit ..
                // tar mane sure .. conversation ta left side e ase .. tar mane amake oi conversation id khuje ber kore .. oitar corresponding
                // last message and timestamp ta update kore dite hobe .. draft ta ke amra muted kore dibo .. taholei kaj hoye jabe ..
                // sheta korar jonno age .. oi conversation id ta amake khuje ber korte hobe .. query: ({ id, data, sender }) conversation
                // id kintu amar kase ase .. ei ta hocche jei conversation ta edit korsi .. shetar id .. amake taile draft theke oi id ta
                // khuje ber korte hobe .. tahole cholun oi corresponding conversation ta khuje ber kori ..
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getConversations", // kontar cash invalid korte chacchi ... shetar API bole dibo
                        arg.sender, // already string .. tai problem hoy ni ..
                        (draft) => {
                            /** infinity scroll -> ekhon kintu amar ar draft er moddhe jinish ta nai .. draft er moddhe data er moddhe data 
                             * er moddhe jinish ta ase .. tai draft.data.find er moddhe change korte hobe .. 
                            */
                            // ei conversation ta ke amar edit korte hobe .. draft er moddhe je array of conversaion ase .. shetar moddhe
                            // jetar id ashole arg.id .. sheta
                            //😀addConversation er khetre ei kaj ta korte hobe..shekhetre id to nai..so, draft er moddhe data push korte hobe
                            const draftConversation = draft.data.find(
                                (c) => c.id == arg.id
                                /**
                                 * ekhane ekta bepar ase .. amra jei draft state ta pai .. ei ta kintu she string akare save kore
                                 * rakhe .. eta kintu amar browser er cash er moddhe ase .. shekhan e shob kichu kintu string ..
                                 * shekhan e kintu object nai .. apnake she draft diye dicche javascript er proxy akare ..
                                 * draft tar moddhe shob kichu local storage e jevabe thake .. local storage e amra stringify kore
                                 * nei na ? draft eo oi vabe thake .. ekdom text akare .. so oi khan e kono number jodi thake ..
                                 * sheta kintu string hoye thake .. so ejonno 😀 c.id je likhsi .. eta number na .. eta string ..
                                 * arg.id kintu number .. karon ei parameter theke esheche .. ejonno ami === diye check korbo na
                                 * ami == diye check korbo
                                 */
                            );
                            draftConversation.message = arg.data.message; // last message ta update kore dilam left side e conversation er moddhe
                            draftConversation.timestamp = arg.data.timestamp;
                        }
                    )
                    /**
                     * ei jaygay amar ekta optimistic update holo .. mane .. server theke kintu response confirm kore ni .. je
                     * asholei update korte pereche kina server e.. but ami client side e kintu update kore felechi .. ekhon ekta
                     * kaj .. jehetu eita optimistic update ... ekhon jodi server side e failed hoy ! ? tahole to apnake shei case
                     * tao handle korte hobe .. tahole apnake revert korte hobe .. sheta apni kivabe korben .. sheita amra jeta
                     * korbo ..ei je amra updateQueryData() jeta pelam.. but ei jinish ta kintu eivabe call kore dile hobe na ..
                     * eita amake ekta dispatch er moddhe call korte hobe .. etao ekta action creator ba action thunk er moto
                     * eta thunk na ashole .. eta action creator arki.. dispatch er moddhe call korle .. jokhon she dispatch kore
                     * felbe .. tar pore .. eta action creator .. thunk na .. jar karone eita asynchronous na .. ei kaj tar porei
                     * ami jinish ta ke dhore fellam .. eitar nam dilam ..patchResult ..
                     */
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
                        /**
                         * Pessimistic Cache Update Related Information
                         * ekhane amra request korechilam and finally dispatch er moddhe message update ta amra kore chilam ..
                         * eta amra silent update korechilam , karon etar response amader dorkar chilo na ..amra just .. conversation
                         * jokhon  edit hocchilo ..silently message update kore dicchilam .. kintu ekhon amra chacchi je na ..
                         * amra message ta successfully update hole, tarpore ami ashole message er corresponding cash ta ami update
                         * kore dibo .. ager bar er moto ami optimistic korbo na .. amra ebar arekta process dekhbo .. sheta hocche
                         * pissimistic .. sheta hocche .. ei je dispatch ta amra korechi .. sheta silent chilo .. eta amra await
                         * kori nai .. amra eta ke asynchronously rekhe diyechi .. hoye jabe automatic .. kintu ekhon jehetu amar
                         * result ta dorkar hobe .. jehetu successfully hole .. taholei ami ashole update ta korbo .. shehetu tahole
                         * ashole amake await korte hobe .. ekhon dispatch amra jani eta by default promise return kore na ..
                         * so , eta ke 😀 promisify korar jonno eta ke .unwrap() method call kore dite hobe .. so , etar response ta ke ami
                         * res er moddhe dhorchi .. tahole message ta send houar pore jokhon response chole ashbe .. sheta ami res er
                         * moddhe pabo ..
                         */
                        const res = await dispatch(
                            // await na korle promise dibe    // tai await korte hobe
                            messagesApi.endpoints.addMessage.initiate({
                                conversationId: conversation?.data?.id,
                                sender: senderUser,
                                receiver: receiverUser,
                                message: arg.data.message,
                                timestamp: arg.data.timestamp,
                            })
                        ).unwrap();

                        // update messages cache pessimistically start
                        // er age amra patch result ta ke save kore chilam .. ebar ar amar dorkar nai .. karon hocche oi jaygay ami
                        // patchResult er moddhe ei jonno rekhechilam .. jeno ami next e server e update na hole ami undo korte pari ..
                        // kintu ekhon amar ar undo korar proyojon nai..karon response ashar pore eta korchi so, definately eta update hobe
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getMessages", // ekhon amake kon ta ke invalidate korte hobe getMessage Api ta ke
                                // amra dekhechi je argument hishebe lage hocche individual id .. taholei etar individual cash ta amra
                                // chinte parbo ..
                                res.conversationId.toString(), // response er moddheo kintu amar id ta ase .. jehetu string hishebe
                                // deowa lage localstorage e dicchi .. tai toString() call kore dicchi // rtk query er cash update ba
                                // edhoroner kono kichu korar shomoy number ba edhoroner kichu deowa jabe na .. only string hote hobe shob kichu
                                // string na hole she cash chinte parbe na ..
                                (draft) => {
                                    draft.push(res); // amar kintu message ekta kore entry hobe .. new ekta kore message object ashse ..
                                    // amar kaj hocche ei cash e .. just sheta ke push kore deowa ..
                                }
                            )
                        );
                        // update messages cache pessimistically end
                    }
                    // if er moddher kaj gula kintu queryFulfilled houar pore hocche .. ei jaygay kintu amra ekta asynchronous
                    // kaj korechi amra .. async kaj kintu amader uchit try catch diye wrap kore deowa .. karon fail korle na hoy
                    // dhorte parbo na .. amra jani async await er khetre amra try catch use kori
                } catch (err) {
                    // jodi fail hoy ... mane server e jodi edit na korte pare .. taile local state er jei change ta korse ..
                    // jei  optimistic cache update korse .. sheta undo kore dibe .. mane abar previous state e chole jabe
                    // mane jei conversation ami optimistic update korechilam .. sheta abar ager jaygay chole jabe ..undo hoye jabe
                    // karon amra jani redux predictable .. jekono jayga theke undo, redo .. egula kora jay
                    patchResult.undo();
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
