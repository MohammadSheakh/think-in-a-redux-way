// import Blank from "./Blank";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../../features/messages/messagesApi";
import Error from "../../ui/Error";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";

export default function ChatBody() {
    // ei khan e amra request ta korbo .. baki component gular moddhe props akare information ta pass kore dibo
    const { id } = useParams();
    const {
        data: messages, // data pabo .. ager moto messages diye rename kore fellam
        isLoading,
        isError,
        error,
    } = useGetMessagesQuery(id); // id ta kintu amar Route parameter e ase ..
    // amra mone korte pari .. press korlei to id pass kore deowa jay .. kintu taile page ta reload dile ar kaj
    // korbe na .. jeno page ta reload dileo indipendently kaj kore .. ejonno route parameter theke nibo amra

    // decide what to render
    let content = null;

    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (!isLoading && isError) {
        content = (
            <div>
                <Error message={error?.data} />
            </div>
        );
    } else if (!isLoading && !isError && messages?.length === 0) {
        content = <div>No messages found!</div>;
    } else if (!isLoading && !isError && messages?.length > 0) {
        content = (
            <>
                <ChatHead message={messages[0]} />

                {/* amar jehetu dui jon er email ta dorkar .. ami jekono ekta message pathiye dibo  */}
                <Messages messages={messages} />
                <Options info={messages[0]} />
            </>
        );
    }

    return (
        <div className="w-full lg:col-span-2 lg:block">
            <div className="w-full grid conversation-row-grid">{content}</div>
        </div>
    );
}
