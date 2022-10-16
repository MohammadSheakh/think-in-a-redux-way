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

    const { data: conversations, totalCount } = data || {}; // blank object diye dilam .. jeno vul na hoy 
    // data nam er ekta jinish thakbe .. tar nam conversations diye alias kore nilam .. 
    /**
     * totalCount kintu ami ekhon peye giyechi .. tar mane ami ekhon page calculate korte parbo .. and tar upor decide 
     * kore .. hasMore er bepar ta manage korte parbo .. 
     */
    const [page, setPage] = useState(1); // initially 1 number page theke shuru kore chilam .. 
    const [hasMore, setHasMore] = useState(true);
    const dispatch = useDispatch();

    const fetchMore = () => {
        // existing data ke update kora .. 
        setPage((prevPage) => prevPage + 1); // state er page  number 1 barabe ... 
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
        /**has more jinish ta bojhar jonno amra dekhechi .. response header er moddhe jinish ta 
         * thake .. amar kintu data er moddhe jinish ta nai .. response header ta ami kothay pabo .. 
         * ami to rtk query diye ekhane data listen korchi .. amar some how .. header theke jinish 
         * ta niye .. data er moddhe diye dite hobe .. naile ami page e jinish ta pabo na .. 
         * er jonno API er moddhe kaj korte hobe amar .. amar response ta getConversations API 
         * theke ashse .. 
         */
        /**
         * rtk query er data jokhon load hoy .. first bar e kintu kichu thakbe na .. amake total count ta ke update 
         * korte hobe .. 
         */
        if (totalCount > 0) {
            // totalCount er value jokhon 0 er theke beshi hobe .. tokhon e ami ashole hasMore er calculation ta korbo .. 
            const more = /⏳⏳⏳ 27:00
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
                // attribute gula copy kore niye ashlam .. documentation theke .. 
                dataLength={conversations.length} // je koyta data load hoyeche .. already .. 
                // 5 ta load hoye jaowar pore .. 5 ta hobe .. 15 ta load hoye jaowar pore .. 15 ta hobe .. 
                next={fetchMore} // jodi nicher dike she scroll kore . taile new data anar jonno ta 
                // ke .. jei function call korte hobe ... 
                hasMore={hasMore} // true false dibo .. aro data ase kina .. ekta state management 
                // korbo .. jokhon e amar shob data chole ashbe .. tokhon ami hasMore false kore dibo
                loader={<h4>Loading...</h4>} // loading ekta component diye dite pari .. 
                height={window.innerHeight - 129}
                /** by default page er hight onujayi she scroll kore .. ami ekta fixed height o bole 
                 * dite pari .. 
                 */
            >  
                {/* 😀 InfiniteScroll diye wrap kore dilam ..  */}
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
