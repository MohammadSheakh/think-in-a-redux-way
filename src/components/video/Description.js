import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteImage from "../../assets/delete.svg";
import editImage from "../../assets/edit.svg";
import { useDeleteVideoMutation } from "../../features/api/apiSlice";
import Error from "../ui/Error";

export default function Description({ video }) {
    const { title, date, id, description } = video;
    const navigate = useNavigate(); // delete korar pore jehetu ekta page e redirect korte hobe .. tai eta ke import korlam

    const [deleteVideo, { isSuccess, isLoading, isError }] =
        useDeleteVideoMutation();
    // ekta hook export kore dibo ei file theke .. jei hook ta component theke call korle .. she amader ke ei deleteVideo
    // function ta diye dibe // video -> description file e kaj korte hobe
    // ekta tuple dibe .. jehetu hook
    // json server delete korle kono data send kore na

    const handleDelete = () => {
        if (id) deleteVideo(id); //
        /**
         *eta kintu ekta asynchronous kaj .. amake handleDelete korei porer page e jaowa jabe na .. server e
         * request gia .. shekhan theke delete hoile .. tarpore confirmation paile .. tarpor ami onno page e
         * jabo .. mane success ta paowar porei redirect korte hobe .. otherwise kintu amake error dekhiye
         * boshe thakte hobe .. ejonno amake useEffect use korte hobe .. karon deleteVideo call korar pore
         * updated jei result ta .. sheta kintu ami porer render e pabo ...  isSuccess kintu ami ei render e
         * pabo na ..
         *
         */
    };

    useEffect(() => {
        // handleDelete function call houar pore
        if (isSuccess) navigate("/"); // success paile navigate kore dibo new page e
    }, [isSuccess, navigate]);

    return (
        <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-800">
                {title}
            </h1>
            <div className="pb-4 flex items-center space-between border-b gap-4">
                <h2 className="text-sm leading-[1.7142857] text-slate-600 w-full">
                    Uploaded on {date}
                </h2>

                <div className="flex gap-6 w-full justify-end">
                    <div className="flex gap-1">
                        <div className="shrink-0">
                            <Link to={`/videos/edit/${id}`}>
                                <img
                                    className="w-5 block"
                                    src={editImage}
                                    alt="Edit"
                                />
                            </Link>
                        </div>
                        <Link to={`/videos/edit/${id}`}>
                            <span className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
                                Edit
                            </span>
                        </Link>
                    </div>
                    <div
                        className="flex gap-1 cursor-pointer"
                        onClick={handleDelete}
                    >
                        <div className="shrink-0">
                            <img
                                className="w-5 block"
                                src={deleteImage}
                                alt="Delete"
                            />
                        </div>
                        <div className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
                            Delete
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-sm text-[#334155] dark:text-slate-400">
                {description}
            </div>

            {!isLoading && isError && (
                <Error message="There was an error deleting the video!" />
            )}
        </div>
    );
}
