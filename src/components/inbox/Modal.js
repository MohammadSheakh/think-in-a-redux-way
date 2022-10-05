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
    const [userCheck, setUserCheck] = useState(false);
    const { user: loggedInUser } = useSelector((state) => state.auth) || {};
    const { email: myEmail } = loggedInUser || {};
    const dispatch = useDispatch();
    const [responseError, setResponseError] = useState("");
    const [conversation, setConversation] = useState(undefined);

    const { data: participant } = useGetUserQuery(to, {
        skip: !userCheck,
    });

    const [addConversation, { isSuccess: isAddConversationSuccess }] =
        useAddConversationMutation();
    const [editConversation, { isSuccess: isEditConversationSuccess }] =
        useEditConversationMutation();

    useEffect(() => {
        if (participant?.length > 0 && participant[0].email !== myEmail) {
            // check conversation existance
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
        // event er value ta ekhane paowar kotha
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
            setUserCheck(true);
            setTo(value); //😀jei kaj ta amar oi khan e korar kotha chilo .. sheta ami .. 500 milisecond pore korchi
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

                        {participant?.length === 0 && (
                            <Error message="This user does not exist!" />
                        )}
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
