import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    conversationsApi,
    useAddConversationMutation,
    useEditConversationMutation,
} from "../../features/conversations/conversationsApi";
import { useGetUserQuery } from "../../features/users/usersApi";
import isValidEmail from "../../utils/isValidEmail";
import Error from "../ui/Error";

export default function Modal({ open, control }) {
    // form er state management er jonno amake local state manage korte hobe ..
    const [to, setTo] = useState("");
    // ekta full email likha jokhon shesh hobe .. tokhon e amra request ta pathabo.. tar mane amake ekta valid
    // email check korte hobe ., ami 😀javascript email regex  likhe search korchi ..
    const [message, setMessage] = useState("");
    const [userCheck, setUserCheck] = useState(false); // skip true false korar jonno ..
    const { user: loggedInUser } = useSelector((state) => state.auth) || {}; // logged in user er email ta niye ashlam
    const { email: myEmail } = loggedInUser || {}; // shuru te jehetu eta thakbe na .. destructure korte giye error khabe .. tai
    // blank object diye dilam // alias kore nam dilam myEmail
    const dispatch = useDispatch();
    const [responseError, setResponseError] = useState(""); // conversation na eshe jokhon error hobe ..
    // conversation hobe ekta array of object ...
    /**
     * conversation ta initially load houar time e undefined thakbe .. jotokhhon porjonto she undefined thakbe mane checking ta
     * hoy ni amar .. checking hoye gele kintu hoy conversation amar blank hoye jabe .. na hoy shetar moddhe ekta array of object
     * thakbe .. ami simply tahole totokkhon porjonto send Message e chap dite dibo na .. jotokkhon porjonto Conversation ..
     * undefined ase ..
     */
    const [conversation, setConversation] = useState(undefined); // jokhon amar convesation available hoye jabe
    // initially undefined kore nilam .. tahole amra conversation ta check korte parbo .. je amar conversation checking kora
    // ta hoye gese kina .. karon conversation na peleo kintu ami message korte dibo .. ami undefined er shathe compare korbo
    // 😛 conversation na pele ami add conversation korbo .. ar pele edit conversation korbo
    // conversation jokhon she pabe na .. tokhon kintu sheta blank array dibe .. jokhon amar conversation shuru te initially
    // check kora hoy nai .. tokhon undefined thakbe .. so, ami jeno undefined and blank array er moddhe jeno check korte pari ..
    // she jonno eta ke undefined rekhechi ..
    // thakle array of object , na thakle blank array naile undefined....

    // request pathate parle participant er moddhe user er information ta ashbe ..
    const { data: participant } = useGetUserQuery(to, {
        skip: !userCheck, // skip jodi ami true diye dei .. taile requst ta hobe na .. pore abar disable korte hobe ..
    }); // ei API ta email dile amake bole dey shei email er kono user ase kina .. she amake data dey .. jeta ke
    // alias kore participant nam diye dilam ..and she parameter e dui ta jinish ney .. email ta ney ..
    // arekta object ney .. ekhon shudhu to likhe rekhe dile .. component mount houar time ei kintu eita execute
    // hoye jabe .. API requst hoye jabe .. tokhon kintu amar to available nai .. kintu amake request ta korte hobe
    // kintu 😀doSearch er moddhe ..setTo(value).. er pore .. tar mane ei  khan e amake automatic request handling
    // ta off korte hobe .. jeta 🎯Module 8 e amra dekhechilam .. SKIP true diye amra sheta korte pari
    // skip jodi ami true diye dei .. taile requst ta hobe na .. pore abar false korte hobe .. on off lagbe ..

    /**
     * 😛participant kintu amra first render e kokhonoi pai na .. karon skip hoye gesilo ... amra porer render e useEffect
     * er moddhe kintu sheta dhorte pari .. je .. data ta ashse kina .. so , ekta data change hoyeche ki hoy nai .. sheta
     * listen korte chai ami .. shei khetre best hocche useEffect ..
     */

    // ekhon finally amader ke message send korte hobe .. so, amra add conversation and edit conversation API Hook ta niye ashlam
    // jeta amader ke endpoint function ta diye dibe first parameter e ... Mutation ekhanei call hoye jay na ..
    const [addConversation, { isSuccess: isAddConversationSuccess }] =
        useAddConversationMutation();
    const [editConversation, { isSuccess: isEditConversationSuccess }] =
        useEditConversationMutation();

    useEffect(() => {
        // ekhane e participant ta listen korte hobe // kokhon ami conversation check er jonno pathabo .. jokhon amar
        // participant ta must exist kore ..
        if (participant?.length > 0 && participant[0].email !== myEmail) {
            // check conversation existance // oi user er shathe amar kono conversation ase kina .. shei checking ekhon amra korbo
            /**
             * conversationsApi er moddhe kintu amra API baniye rekhechilam getConversation nam e .. shekhan e amader ke dite
             * hoy userEmail ar participantEmail .. taholei she amake bole dibe tar shathe amar kono conversation ase kina
             * eta jehetu dependent .. ei bar ami ei call ta ektu different vabe korbo.. ta te apnara arekta format o dekhben ..
             * and decide korte parben .. kokhon kivabe korben ..
             *
             * amra kintu dekhen .. jokhon e kono request pathate chacchi RTK Query te .. tokhon e.. ekhon porjonto amra hook
             * er maddhome korechi ..UseGetUserQuery() .. egula kintu hook .. amra jani hook kintu top level e kaj kore ..
             * kono internal function er vitore kaj kore na .. amra chaile skip er maddhomeo korte pari .. but amra arekta way
             * shikhbo .. amra jani RTK Query kintu amader kas theke shob kichu abstruct kore rakhse .. Hide kore rakhse ..
             * onek code .. jegula amra age dekhe eshechi .. shegula kintu ekhon amra dekhtei parsi na .. like manually ekhon
             * amra kintu action dispatch e korchi na .. API fire hoye jacche .. Async Thunk gula she automatically call korche ..
             *
             * Amra chaile manually Action Dispatch korte pari .. Oi je Conversation API amra likhechilam .. etar corresponding
             * thunk function o kintu amader kase ache .. Shei Thunk Function gula amra call korte pari .. O ektu onno vabe dey
             * jinish ta .. ei API tar nam ki Conversation API ..so, amra chacchi ekhane getConversation API ta call korbo...
             * tahole action dispatch koreo amra korte pari kaj ta .. ejonno amra dispatch function ta niye ashlam ..
             * amra normally jevabe async thunk dispatch kori .. shevabe manually RTK Query er jinish gula keo kora jay. Thunk ta
             * ami pabo ki kore ? ... getConversation API er corresponding thunk ta ami pabo ki vabe ? sheta korar jonno
             * conversationsApi.endpoints.getConversation.initiate() // ei function ta call korte hobe .. ei ta amader ke thunk
             * return kore dey .. amra manually jevabe async thunk kora shikhechi .. amra chaile erokom model e .. hook use na
             * kore manually function call koreo requst korte pari .. ei funciton ta jokhon amra dispatch korbo .. tokhon basically
             * ek e kaj e hobe .. oi requst tai jabe .. initiate korar shomoy API file theke dekhe jei jei parameter chay
             * tar value diye dite hobe .. value deowar order may be important na
             *
             *Conversation peye gechi .. ekhon amra ber korte parbo .. Conversation ID exist kore kina ..
             *
             */
            dispatch(
                conversationsApi.endpoints.getConversation.initiate({
                    userEmail: myEmail,
                    participantEmail: to,
                })
                // Conversation peye gechi .. ekhon amra ber korte parbo .. Conversation ID exist kore kina ..
                // Conversation jehetu peye giyechi .. tai shekhan theke ami ID ta ber kore niye ami Edit korbo .. mane
                // new ekta message , full message body edit kore .. shekhan e dhukiye dibo ..
                /**
                 * ar jodi ami na petam .. ekhane 0 petam .. tahole ami notun Conversation Add kortam ..
                 *
                 * tobe ekhane ekta catch ase .. amra ei je dispatch ta korlam .. eita to ekta async thunk .. etar porer line ei
                 * kintu ami result ta pabo na .. tai na ? .. karon eita to Async Await er moto na ..tar mane eita kintu apnake
                 * ekta promise dicche na ...eta just ekta Request korche .. eta ekta event er moto .. apnake listen korte hole
                 * apni kivabe listen korben ..  amar to ei jayga ta tei listen kora dorkar chilo ashole .. ami jodi listen korte
                 * partam .. mane then catch korte partam .. tahole eita korar porei ami kintu deceition nite partam .. karon amar
                 * conversation er existance thakle ek rokom .. na thakle arek rokom .. and conversation ta amar neowa lagbe ..
                 * karon jei result ta ashse .. karon amra je dekhlam .. jei result ta ashse .. ei result ta ami receive korbo
                 * kothay .. karon jokhon ami hook use kortam .. tokhon ami 😛 Data er moddhe petam .. ei khetre ami pabo kivabe ..
                 * ei khetre ami jodi porer line ei pete chai .. ami jodi async await er moto ba promise then er moto kore jodi pete
                 * chai ..tahole amra ekhane unwrap() use korte paren .. unwrap() jeta korbe .. she apnake ekta promise dibe .. tar
                 * mane hocche initially ekta async thunk call korechi .. eta ke promisify korar jonno .. promise e convert kore
                 * niye ashar jonno .unwrap() apnake call korte hobe .. unwrap call korle ei ta ekta promise hoye gese .. ekhon apni
                 * then o use korte paren .. async await o use korte paren .. amra ekhane then catch korlam ..
                 */
            )
                .unwrap()
                .then((data) => {
                    setConversation(data); // then er moddhe jinish pabo //😛 mane conversation ta pabo // array of object dey
                    // conversation tao dey
                    // local state e save kore fela tai buddhiman er kaj
                })
                .catch((err) => {
                    // ekhane jodi kono ekta karone error hoy .. taile kintu ami kono deceition nite parbo na ..
                    // error ta amra chaile handle kore felte pari
                    setResponseError("There was a problem!"); // error er jonno o ekta local state handle kolam
                });
        }
    }, [participant, dispatch, myEmail, to]);

    // listen conversation add/edit success  //// Modal close korar jonno // conversation success hoile modal close kore dibo
    useEffect(() => {
        if (isAddConversationSuccess || isEditConversationSuccess) {
            control(); // Side Bar Component e gele bujha jabe jinish .. state jeta thakbe .. sheta change hoye jabe ..
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAddConversationSuccess, isEditConversationSuccess]);

    // debounceHandler function ta ami ekhane likhbo ..
    const debounceHandler = (fn, delay) => {
        // she ekta function receive kore and delay ta receive kore ..
        // amar kaj hocche ekhan theke arekta function return kore deowa .. jei function ta ashol event ta pay
        // ei function tai hocche actual amar .. jei handler ta amra ekhane diye thaki ..
        // {
        //     (e) => handleSearch(e.target.value);
        // }
        // ei purata return er pore jei function likhtesi .. shekhan e eshe pouchacche ..
        let timeoutId;
        return (...args) => {
            // event charao aro joto argument ase .. sheta ekhane nicchi .. karon aro argument thakte pare
            // ei function er moddhe ami setTimeout korbo
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                // doSearch function ta ami ekhane call kore dibo
                // eta to bar bar e hote thakbe .. so, amader ke jeta korbe hobe .. sheta hocche .. clear korte hobe
                // mane she jodi 500 milisecond houar agei arekta type kore fele .. tokhon e to abar setTimeOut kora
                // lagbe .. ejonno amra eta ke timeoutId nam er ekta jinish er moddhe rekhe .. ta ke clearTimeout function
                // e ta ke pass kore dibo
                fn(...args);
            }, delay);
        };
    };

    // doSearch Function ta ami alada likhlam .. eta amar actual function ta .. mane jei kaj ta ami korbo ..
    // debounce complete hoye jaowar pore , 500 milisecond hoye jaowar pore ami actual jei kaj ta korbo
    const doSearch = (value) => {
        console.log("from Modal.js -> doSearch function from debounce : Hello");
        // event er value ta ekhane paowar kotha // full event ta ashse .. shejonno shekhan thekei e.target.value
        // pathate hobe
        /**
         * ei jaygay kintu ekhon amra request ta pathabo kintu.. API request ta korbo ..
         *  shei API REQUEST ta .. mane jei API Request ta ashole likha hoyeche .. kono valid user ashole
         * oi email address er against e ase naki .. mane getUser diye amra jei API ta likhechilam ..
         * sheta te pathabo .. kintu shob shomoy pathabo na .. jokhon amar full email ta esheche form e ..
         * shei value ta jodi actually ekta email format er hoy .. taholei ami request ta pathabo .. otherwise
         * ami request ta pathabo na ..
         *
         * Email Valid korar function ta kintu ami niye ashsi utils theke
         */
        if (isValidEmail(value)) {
            // check user API
            console.log("doSearch Function -> Email is Valid From Modal.js ");
            setUserCheck(true); // skip false kore dilam .. taile ekhon amar API request ta jabe ..
            // final shob check korar porei local state e set ta korlam ..
            setTo(value); //😀jei kaj ta amar oi khan e korar kotha chilo .. sheta ami .. 500 milisecond pore korchi
            //🆕🆕 ekhon ami requst kore dekhbo je .. amar jei email ta esheche .. jei value ta esheche ..
            // oi nam e kono user exist kore kina .. jodi user exist kore .. tahole ami porer step e jabo .. nahole
            // oi khanei ta ke ami error diye dibo ..
            // ekhon amra sure je ekhane actual email formate ekhane ashbe .. ekhon jokhon tar lekha shesh hobe
            // tokhon amra ekta API request kore dekhbo .. oi Email Address .. Asholei amar database e ase kina ..
            // USER table e ase kina ..
            /**
             * ekhan theke hoy conversation  id ami pabo .. na hoy pabo na .. paowa ba na paowa .. er pore ami
             * button disable korar decision nibo ..
             *
             * user to pailam .. ekhon amar next step hocche .. ami ki conversation table e EDIT korbo .. mane
             * already ki tar shathe amar conversation ase ? .. sheta amake jante hobe .. tahole ami EDIT korbo
             * ar na thakle ami ADD korbo .. tar mane valid user er shathe amar .. mane logged in USER .. tar kono
             * conversation exist kore kina .. shei API ta amar call kora lagbe .. ekhoni .. sheta call kora lagbe ..
             * kokhon ? amar ei USER Check hoye jaowar pore .. jodi USER thake  ? taholei amra porer ta korbo ...
             * ei dependent query ta amra kivabe korte pari ..
             *
             */
        }
    };

    const handleSearch = debounceHandler(doSearch, 500); // handle search er kintu event ta paowar kotha
    // kintu ami sheta na kore .. arekta function ekhane assign kore dicchi
    // mane ami handleSearch function ta arekta function diye return koriye niye ashbo ..

    // debounceHandler e bole dibo .. ami debounceHandler e ki korbo .. ami kichukkhon atkabo shekhane
    // atkanor pore ami to kichu ekta kaj korbo .. so, amar kaj ta ki ? sheta hocche amar dhoren doSearch..
    // and 500 milliseconds er ekta delay dilam ..

    const handleSubmit = (e) => {
        e.preventDefault(); // jeno page reload na ney

        if (conversation?.length > 0) {
            // edit conversation // conversation id exist korle mane age tar shathe amar conversation hoise emon case e ..edit korbo
            editConversation({
                id: conversation[0].id,
                sender: myEmail, //😀 je logged in user .. shei kintu sender ..
                data: {
                    // data hishebe conversation er body dite hoy
                    participants: `${myEmail}-${participant[0].email}`,
                    users: [loggedInUser, participant[0]], // duita object pass kore dilam .. ekta array er moddhe
                    message,
                    timestamp: new Date().getTime(),
                },
            });
        } else if (conversation?.length === 0) {
            //add conversation//conversation id exist na korle amar new conversation create korbo .. tar id automatic generate hobe
            addConversation({
                // addConversation e shudhu data ta dite hobe .. full object deowar dorkar nai .. id automatic create hoye jabe
                sender: myEmail, //😀 je logged in user .. shei kintu sender ..
                data: {
                    participants: `${myEmail}-${participant[0].email}`,
                    users: [loggedInUser, participant[0]],
                    message,
                    timestamp: new Date().getTime(),
                },
            });
        }
    };

    return (
        open && (
            <>
                <div
                    onClick={control}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                ></div>
                <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Send message
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="to" className="sr-only">
                                    To
                                </label>
                                <input
                                    id="to"
                                    name="to"
                                    type="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Send to"
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    // Shudhu handleSearch likhle full event ta ashse ..
                                    // shejonno shekhan thekei e.target.value pathate hobe
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                                // amar kintu deceition neowa hoye gese.. ekhon amar send message kora baki ..
                                // ei send message ta ke kokhon ami disabled korbo .. kokhon ami enable korbo
                                disabled={
                                    /**
                                     * mane hocche conversation ekhono initial obosthay ase .. tokhon ami button e press korte dibo
                                     * na .. hoy conversation jokhon blank array thakbe ba array of object thakbe .. tokhon e ami
                                     * button press korte dibo
                                     */
                                    conversation === undefined ||
                                    (participant?.length > 0 &&
                                        participant[0].email === myEmail)
                                }
                            >
                                Send Message
                            </button>
                        </div>
                        {/* user valid na hole ami Error dibo.. je tumi message
                        pathate parba na */}
                        {participant?.length === 0 && (
                            // kono user na ashle ami ei text dekhabo ..
                            <Error message="This user does not exist!" />
                        )}
                        {/* participant er email ar amar email same hoye gele error
                        dekhabo .. */}
                        {participant?.length > 0 &&
                            participant[0].email === myEmail && (
                                <Error message="You can not send message to yourself!" />
                            )}
                        {/* responseError thakle shetao dekhabe  */}
                        {responseError && <Error message={responseError} />}
                    </form>
                </div>
            </>
        )
    );
}
