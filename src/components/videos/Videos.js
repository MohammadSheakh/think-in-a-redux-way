import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
    const { data: videos, isLoading, isError, error } = useGetVideosQuery();
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
