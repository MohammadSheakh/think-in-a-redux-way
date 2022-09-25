// video description page 
/**
 * ekhon amra request er kaj korbo .. request ta amra kothay korbo ?
 * amader jei page ta ase .. shei video page e request korbo .. 
 */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/description/Player";
import VideoDescription from "../components/description/VideoDescription";
import RelatedVideoList from "../components/list/RelatedVideoList";
import Loading from "../components/ui/Loading";
import { fetchVideo } from "../features/video/videoSlice";

export default function Video() {
    const { video, isLoading, isError, error } = useSelector(
        (state) => state.video
    );
    const dispatch = useDispatch();
    const { videoId } = useParams(); // amra useParams use kore id ta pai 
    // url er id .. pete chaile .. .. joto parameter e ase .. 
    // shob gula ke amra ekta object akare pai ..
    // app.js er moddhe amra ei paramter er ekta nam nijerai diyechilam .. 
    //  videoId nam e .. ei nam ei she object er moddhe dibe ... 

    useEffect(() => {
        dispatch(fetchVideo(videoId)); // async thunk function dispatch korbo 
    }, [dispatch, videoId]); // jeta parameter hishebe pathai .. shetao dependency .. 
    /**
     * request pathay fellei .. toolkit ki korbe .. action dispatch kore state update
     * kore felbe .. sei state theke amar kaj hocche single video ta niye asha .. 
     */

    const { id, link, title, tags } = video || {}; // destructuring e jeno error na hoy .. 
    // safe side e thakar jonno 

    // decide what to render
    let content = null; // first e null dia initialize korlam 
    if (isLoading) content = <Loading />;

    if (!isLoading && isError)
        content = <div className="col-span-12">{error}</div>;

    if (!isLoading && !isError && !video?.id) {
        content = <div className="col-span-12">No video found!</div>;
    }

    if (!isLoading && !isError && video?.id) {
        content = (
            <div class="grid grid-cols-3 gap-2 lg:gap-8">
                <div class="col-span-full w-full space-y-8 lg:col-span-2">
                    <VideoPlayer link={link} title={title} />

                    <VideoDescription video={video} /> 
                    {/* tar onek kichu proyojon .. tai full object tai ta ke pathiye dicchi  */}
                </div>

                <RelatedVideoList currentVideoId={id} tags={tags} />
                {/* current video id ta pathate hobe .. jeno .. ei video chara 
                onno video gula ashe ..  current videos er tags gula send kore dilam */}
            </div>
        );
    }

    return (
        <section class="pt-6 pb-20">
            <div class="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
                {content}
            </div>
        </section>
    );
}
