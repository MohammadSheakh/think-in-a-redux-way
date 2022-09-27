import { useState } from "react";
import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
    const [request, setRequest] = useState(false);
    /**
     * useGetVideosQuery() er moddhe first parameter e jeta dei .. sheta ashole argument
     * jeta dei .. sheta apiSlice er endpoints er query call back function e chole jay ..
     * first parameter ta .. ekhon amar jehetu kono parameter nai .. ami tai undefined
     * dilam .. 2nd paramter e kichu options bole deowa jay .. object er moddhe
     * 😀 refetchOnFocus.. by default false thake .. eta true kore dile .. onno tab e chole geleo .. pore abar ei tab e focus e chole ashle .. she reload nibe content
     * 😀 refetchOnMountOrArgChange .. eta important ..by default false thake .. arg change bolte bujhacche .. ei component er Argument change ..mane ei videos component ta to bivinno shomoy re-render hote pare ..
     * eta Video Component er khetre projonno jemon link:video/1 etar 1 kintu dynamic .. so user jekono jayga theke link e gelei jeno component ta render hoy
     * etar abar time o bole dite paren .. like 5 .. taile 5 second er moddhe joto bar mount kore unmount kore na keno .. she re-fetch korbe na
     * 😀 refetchOnReconnect .. internet disconnect hoye gele .. pore internet back korle load nibe content
     * 😀 selectFromResult
     */
    /**
     * useGetVideosQuery() eta kintu automatic call hoye jacche .. er upor kintu amader kono control nai ..
     * kintu emon jodi hoy .. apnake manually request korte hobe .. like kono ekta button e press kore apni
     * request korte chan ..karon eta to ekta hook .. hook to amra kono function er moddhe use korte pari na
     * useGetVideosQuery(undefined, {
     *      skip : true , // eta bole dile initial request ta hobe na ..
     * })
     * ekhon amra jodi skip er true false ta ke amader kono state diye control korte pari ..
     * skip : !request,
     *
     * component load houar pore useEffect er maddhome ..
     * useEffect(() => {
     *      setRequest(true);
     * },[]);
     *
     * ekta button er onClick e setRequest(true); kore dite parbo .. tailei hobe
     *
     *
     * useGetVideosQuery(undefined, {
     *      pollingInterval : 3000 , // mane 3 second por por she automatic fetch kortei thakbe .. request kortei thakbe
     * }
     */
    const { data: videos, isLoading, isError, error } = useGetVideosQuery(); // isLoading, isError er shathe refetch  o pai .. and eita kintu ekta function .. function ta jekhan e call korbo ..tarpore refetch o hobe data ta ..ek e data pele cash theke diye dibe
    // hook use korar niyom.. useGetVideosQuery() ei jinish bebohar korlei
    // request call hoye jabe .. amake kono useEffect use korte hobe na ..
    // dispatch ana lagbe na .. she amake data , isLoading, isError diye dibe
    // data ta hocche , server e request korar por je response ta peyechi
    // sheta she data er moddhe diye dey .. loading obosthay jodi she thake
    // taile isLoading true she diye dey .. isError diye dey
    // data ke amra alias kore nibo .. mane rename kore nilam
    // eta korlei request hoye jabe .. kono useEffect likha lagbe na
    /**
     * amra jani useGetVideosQuery() kintu ultimately ekta request korbe ..
     * tar mane definately useEffect she internally she nije use korbe ..
     * tar mane first bar e kintu useEffect call hobe na .. prothom bar e
     * amar data ta thakbe na ..so, amake tahole loading state ta analysis kore shei
     * onujayi state ta manage korte hobe
     */

    // decide what to render
    let content = null;

    if (isLoading) {
        content = (
            <>
                <VideoLoader />
                <VideoLoader />
                <VideoLoader />
                <VideoLoader />
            </>
        );
    }

    if (!isLoading && isError) {
        content = <Error message="There was an error" />;
    }

    if (!isLoading && !isError && videos?.length === 0) {
        content = <Error message="No videos found!" {...error} />; // 😀😀
    }

    if (!isLoading && !isError && videos?.length > 0) {
        content = videos.map((video) => <Video key={video.id} video={video} />);
    }

    return content;
}
