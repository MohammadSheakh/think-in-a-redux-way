import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../features/videos/videosSlice";
import Loading from "../ui/Loading";
import VideoGridItem from "./VideoGridItem";

export default function VideGrid() {
    /**
     * VideoGrid er moddhe amra request ta pathabo ..request pathanor jonno amader ke
     * action dispatch korte hobe.. amra ki dispatch korbo .. amra amader async thunk jeta
     * baniyechilam ..fetchVideos() .. sheta ke amra dispatch  korbo ..
     * dispatch korar jonno amader useDispatch ta lage ..
     */
    const dispatch = useDispatch();
    /**
     * amake state ta ke read korte hobe somehow
     */
    const { videos, isLoading, isError, error } = useSelector(
        // she amake full state ta diye dey .. tar vitor theke amake videos slice ta ber kore nite hobe
        // and videos slice er moddhe initial state e jegula chilo.. shegula destructure kore nilam
        (state) => state.videos // state. ei tuku full global state .. shetar videos node er moddhe
        //initial state ta return kore .. destructure kore nite hobe
    );
    /**
     * request pathano .. ba ei dhoroner kaj gula ki kaj .. eta hocche side effect ..
     * ei dhoroner kaj useEffect hook er moddhe korte hoy ...
     */

    // component render houar pore useEffect ekbar kaj korbe // erpor request ta jabe
    useEffect(() => {
        // ekta callback function dite hoy
        dispatch(fetchVideos()); // async thunk function dispatch korte hobe ..
        // eta ke ekhane call korte hobe .. karon eita async thunk .. eta action creator
        // er moto kaj kore .. so, action creator ke call korle .. amra actual action
        // ta pai
    }, [dispatch]);

    // decide what to render
    let content;

    if (isLoading) content = <Loading />;
    if (!isLoading && isError)
        content = <div className="col-span-12">{error}</div>;

    if (!isError && !isLoading && videos?.length === 0) {
        content = <div className="col-span-12">No videos found!</div>;
    }

    if (!isError && !isLoading && videos?.length > 0) {
        content = videos.map((video) => (
            <VideoGridItem key={video.id} video={video} />
        ));
    }

    return (
        <section className="pt-12">
            <section className="pt-12">
                <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
                    {content}
                </div>
            </section>
        </section>
    );
}
