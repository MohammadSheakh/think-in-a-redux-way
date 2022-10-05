import { useSelector } from "react-redux";
import Message from "./Message";

export default function Messages({ messages = [] }) {
    // props akare messages gula pabo .. and default value hishebe ekta blank array rekhe dilam
    // shei onujayi ami iterate kore ami jinish gula dekhiye dibo
    /**
     * ekta Message object er moddhe gele.. dekhte parbo .. sender o receiver bola ase .. ami to
     * amar email address jani .. ami shudhu check korbo je .. sender er email address jodi amar tar
     * shoman na hoy tahole she hocche participant ..
     */
    const { user } = useSelector((state) => state.auth) || {}; // auth theke ami amar email ta niye ashlam ..
    // blank object diye rakhlam .. naile destructure fail korbe .. null checking er jonno ekta blank object
    // diye rakhlam ..
    const { email } = user || {}; // etao jeno fail na kore .. ejonno ami blank object niye nilam..
    // eta hocche amar email .. jei user logged in kora ase .. tar email ..

    return (
        <div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
            {/* // flex-col-reverse ... etar jonno upor theke shuru na hoye nich theke shuru hocche eta important  */}
            <ul className="space-y-2">
                {messages
                    .slice() // original array er upor e sort kora jay na .. ejonno copy kore nite hobe .. slice kore nite hobe
                    .sort((a, b) => a.timestamp - b.timestamp)
                    .map((message) => {
                        // ekhane jehetu kaj kora lagbe
                        const {
                            message: lastMessage,
                            id,
                            sender,
                        } = message || {};

                        // amar ta end hobe .. participant er ta start hobe ..
                        const justify =
                            sender.email !== email ? "start" : "end";
                        // ami sender hole .. justify hobe end ..

                        return (
                            <Message
                                key={id}
                                justify={justify}
                                message={lastMessage}
                            />
                        );
                    })}
            </ul>
        </div>
    );
}

// {
//     messages.map((message) => (
//         <Message key={id} message={lastMessage}></Message>
//     ));
// }
