import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../../features/tags/tagsSlice"; // named export kora hoyechilo .. 
// tai named import korte hobe .. 
import Tag from "./Tag";

export default function Tags() {
    const { tags } = useSelector((state) => state.tags);
    // useSelector use korle .. ami full state ta pai .. er 
    // moddhe theke mane full state theke er tags node ta 
    // na tags slice ta return korbo 
    // tagsReducer ta tag nam e chilo .. store e .. 
    const dispatch = useDispatch();

    // data load kora ekta side effect .. tai amar 
    // useEffect lagbe .. 
    useEffect(() => {
        dispatch(fetchTags()); // call kore dite hobe .. 
        // async thunk function ta dispatch korbo jehetu .. 
        // tai dispatch tao niye ashlam .. 
    }, [dispatch]);

    // tags er length jodi 0 er cheye boro hoy .. 
    return tags?.length > 0 ? (
        <section>
            <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto">
                {tags.map((tag) => (
                    <Tag key={tag.id} title={tag.title} />
                ))}
            </div>
        </section>
    ) : null; // otherwise null diye dibo .. 
}
