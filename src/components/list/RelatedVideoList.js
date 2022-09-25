import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/ui/Loading";
import { fetchRelatedVideos } from "../../features/relatedVideos/relatedVideosSlice";
import RelatedVideoListItem from "./RelatedVideoListItem";
// single video page theke ashse .. 
export default function RelatedVideoList({ currentVideoId, tags }) {
    const dispatch = useDispatch();
    // useEffect kaj korar pore .. ekhon ami useSelector diye dorte parbo 
    const { relatedVideos, isLoading, isError, error } = useSelector(
        (state) => state.relatedVideos
    );

    // ekhane request pathate hobe .. tarpor map korte hobe 
    useEffect(() => {
        dispatch(fetchRelatedVideos({ tags, id: currentVideoId }));
    }, [dispatch, tags, currentVideoId]);

    // decide what to render
    let content = null;

    if (isLoading) content = <Loading />;
    if (!isLoading && isError) {
        content = <div className="col-span-12">{error}</div>;
    }
    if (!isLoading && !isError && relatedVideos?.length === 0) {
        content = <div className="col-span-12">No related videos found!</div>;
    }
    if (!isLoading && !isError && relatedVideos?.length > 0) {
        content = relatedVideos.map((video) => (
            <RelatedVideoListItem key={video.id} video={video} />
        ));
    }

    return (
        <div class="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {content}
        </div>
    );
}
