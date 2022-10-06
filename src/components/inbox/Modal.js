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
    const [responseError, setResponseError] = useState("");
    const [conversation, setConversation] = useState(undefined);

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
             */
            dispatch(
                conversationsApi.endpoints.getConversation.initiate({
                    userEmail: myEmail,
                    participantEmail: to,
                })
            )
                .unwrap()
                .then((data) => {
                    setConversation(data);
                })
                .catch((err) => {
                    setResponseError("There was a problem!");
                });
        }
    }, [participant, dispatch, myEmail, to]);

    // listen conversation add/edit success
    useEffect(() => {
        if (isAddConversationSuccess || isEditConversationSuccess) {
            control();
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
        e.preventDefault();

        if (conversation?.length > 0) {
            // edit conversation
            editConversation({
                id: conversation[0].id,
                sender: myEmail,
                data: {
                    participants: `${myEmail}-${participant[0].email}`,
                    users: [loggedInUser, participant[0]],
                    message,
                    timestamp: new Date().getTime(),
                },
            });
        } else if (conversation?.length === 0) {
            // add conversation
            addConversation({
                sender: myEmail,
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
                                disabled={
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
                        {responseError && <Error message={responseError} />}
                    </form>
                </div>
            </>
        )
    );
}
