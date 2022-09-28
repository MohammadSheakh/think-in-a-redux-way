// import Success from "../ui/Success";
import { useState } from "react";
import { useAddVideoMutation } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import Success from "../ui/Success";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

export default function Form() {
    const [addVideo, { isLoading, isSuccess, isError }] = useAddVideoMutation();
    /**
     * query er belay amra actual data ta pai.. and amra ekta object petam .. but ekhane amra tuple pabo ..
     * and ei tuple er moddhe first part e amake oi function ta diye dibe .. apiSlice er moddhe .. jei
     * addVideo End Point ta likhsilam .. shei function ta ..2nd part e amra oi object ta pabo .. jeta
     * amra query er belay petam.. data ta pabo .. data ta mane .. amar add request pathanor pore server
     * jei response ta diyeche ..shei response ta ami data er moddhe pabo ... data: video, isLoading....
     *
     * useAddVideoMutation(); eita kintu automaticaly call hobe na .. karon eita to GET Request na.. She
     * oi poriman smart..
     *
     * amra addVideo function ta call korte parbo ..and sheta call korar shomoy amra amader data ta diye dibo ..\
     *
     * 😀 Video add korar pore jeno Home page ta automatic data fetch kore niye ashe .. sheta amra next video te
     * kora shikhbo .. Cache Behavior - Revalidation .. onno khetre home page jeno ekta nirdishto time pore
     * data fetch kore but  video add page er belay .. shathe shathei fetch kora uchit
     *
       // she jei cash ta maintain kore sheta ke add video file er jonno invalidate kore dite hobe 
     */

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState("");
    const [views, setViews] = useState("");

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setAuthor("");
        setLink("");
        setThumbnail("");
        setDate("");
        setDuration("");
        setViews("");
    };

    // handleSubmit nam e amar ekta function banate hobe
    const handleSubmit = (e) => {
        e.preventDefault(); // page jeno reload na ney
        addVideo({
            title,
            description,
            author,
            link,
            thumbnail,
            date,
            duration,
            views,
        }); // addVideo() function er moddhe data gula object akare pass kore dilam
        resetForm(); // finally reset koreo dite hobe form ta ..  ..
    };

    return (
        <form method="POST" onSubmit={handleSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <TextInput
                                title="Video title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <TextInput
                                title="Author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>

                        <div className="col-span-6">
                            <TextArea
                                title="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="col-span-6">
                            <TextInput
                                title="YouTube Video link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </div>

                        <div className="col-span-6">
                            <TextInput
                                title="Thumbnail link"
                                value={thumbnail}
                                onChange={(e) => setThumbnail(e.target.value)}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <TextInput
                                title="Upload Date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput
                                title="Video Duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput
                                title="Video no of views"
                                value={views}
                                onChange={(e) => setViews(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        disabled={isLoading} // jokhon loading obosthay ase .. tokhon jeno pess na korte pare ..
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
                {/* // Response  */}
                {isSuccess && (
                    <Success message="Video was added successfully" />
                )}
                {isError && (
                    <Error message="There was an error adding video!" />
                )}
            </div>
        </form>
    );
}
