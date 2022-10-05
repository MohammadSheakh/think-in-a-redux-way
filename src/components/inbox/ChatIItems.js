import gravatarUrl from "gravatar-url";
import moment from "moment"; // timestamp jeta ashe .. sheta ke human readable formate e dekhate chaile .. ei moment  ta use korte hoy ..
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    conversationsApi,
    useGetConversationsQuery,
} from "../../features/conversations/conversationsApi";
import getPartnerInfo from "../../utils/getPartnerInfo"; // utils
import Error from "../ui/Error";
import ChatItem from "./ChatItem";

export default function ChatItems() {
    //useGetConversationsQuery() er moddhe current logged in user er email ta pass kore dite hoy .. tahole amake age state
    // theke user ta ke niye ashte hobe .. tar moddhe email ta destructure kore nite hoy .. amra jani redux er authSlice er moddhe
    // jinish ta ase
    const { user } = useSelector((state) => state.auth) || {}; // ekta ase access token arekta ase user object
    const { email } = user || {}; // safety er jonno blank object diye rakhsi ..
    /**
     * ei jayga tai hocche amader perfect place .. jekhan e amra amader API ta ke call korte pari .. Conversations er jei
     * hook ta sheta amra ekhane use korte pari .. ekhane data ene .. ami ekhane map korte parbo .. ekhane loading error
     * dekhate parbo .. ekhane amader jei query ta .. sheta ekhane amra korte pari ..
     */
    const { data, isLoading, isError, error } =
        useGetConversationsQuery(email) || {}; // query er jonno proyojonio argument amar deowa shesh ..

    const { data: conversations, totalCount } = data || {};
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const dispatch = useDispatch();

    const fetchMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        if (page > 1) {
            dispatch(
                conversationsApi.endpoints.getMoreConversations.initiate({
                    email,
                    page,
                })
            );
        }
    }, [page, email, dispatch]);

    useEffect(() => {
        if (totalCount > 0) {
            const more =
                Math.ceil(
                    totalCount /
                        Number(process.env.REACT_APP_CONVERSATIONS_PER_PAGE)
                ) > page;

            setHasMore(more);
        }
    }, [totalCount, page]);

    // decide what to render // karon shuru tei to amader data available hoy na ..
    let content = null;

    if (isLoading) {
        content = <li className="m-2 text-center">Loading...</li>;
    } else if (!isLoading && isError) {
        content = (
            <li className="m-2 text-center">
                <Error message={error?.data} />
                {/* error.data er moddhe ashole she error ta dey */}
            </li>
        );
    } else if (!isLoading && !isError && conversations?.length === 0) {
        content = <li className="m-2 text-center">No conversations found!</li>;
    } else if (!isLoading && !isError && conversations?.length > 0) {
        content = (
            <InfiniteScroll
                dataLength={conversations.length}
                next={fetchMore}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                height={window.innerHeight - 129}
            >
                {conversations.map((conversation) => {
                    // protibar ekta kore conversation pabo..
                    const { id, message, timestamp } = conversation; // conversation er vitorer jinish gula destructure kore nilam
                    const { email } = user || {};
                    const { name, email: partnerEmail } = getPartnerInfo(
                        conversation.users, // conversations er users array ta pass kore dite hoy
                        email // logged in user er Email tao pass kore dite hoy
                    );
                    // eta amader total parter return kore .. ami tar nam ar email destructure kore nilam ..

                    // ekhan theke ami return kore dibo .. ek ekta Chat Item ..
                    return (
                        <li key={id}>
                            <Link to={`/inbox/${id}`}>
                                <ChatItem
                                    avatar={gravatarUrl(partnerEmail, {
                                        // ekhane ami parter er email ta use korbo .. and gravatar ke use korbo
                                        size: 80, // kon size er image chai
                                    })}
                                    name={name} // eta hocche parter er nam ta
                                    lastMessage={message}
                                    lastTime={moment(timestamp).fromNow()}
                                    // timestamp jeta ashe .. sheta ke human readable formate e dekhate chaile .. ei moment ta use korte hoy ..
                                />
                            </Link>
                        </li>
                    );
                })}
            </InfiniteScroll>
        );
    }

    return <ul>{content}</ul>;
}

/**
 * ami chara onno jini participant asen .. ei conversation er ..tar chobi dekhabo .. and tar nam dekhabo ..
 * ekhon amader data base amar information o deowa ase .. abar participant er information o deowa ase ..
 * ekhon ke ami ar ke participant .. eta kintu bole deowa nai .. amake decetion nite hobe .. ami to logged in
 * user .. amar Email ta jani .. ami kintu "USERS NODE" theke filter kore ber korte pari je ..ami chara onno
 * jei object ta ase .. sheta hocche participant er information .. taholei to hoye jay .. so, amra shei kaj tai korbo
 * karon amar avatar o dekhate hobe .. oi participant er .. tahole shudhu oi participant er information dekhanor
 * jonno .. ami jeta korbo..  ami ekta kaj kori .. jeno ami oita reuse korte pari next time e .. ami src er moddhe
 * utils nam e ekta folder nicchi .. tar moddhe utility function likhsi ..
 */
