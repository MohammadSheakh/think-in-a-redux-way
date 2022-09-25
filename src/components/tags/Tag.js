import { useDispatch, useSelector } from "react-redux";
import { tagRemoved, tagSelected } from "../../features/filter/filterSlice";
// action gula niye ashlam .. 
/**
 * ekhane select korar o feature rakhte hobe 
 * mane etar onClick e kichu ekta korte hobe ..  
 * 
 */
export default function Tag({ title }) {
    const dispatch = useDispatch();
    const { tags: selectedTags } = useSelector((state) => state.filter);
    // tags: selectedTags ... bojhar jonno alias kore dilam 
    const isSelected = selectedTags.includes(title) ? true : false; // selectedTags er moddhe 
    // title ta thakle .. sheta selected .. // current tag ta selected ase kina .. sheta 
    // jante parbo .. 

    const style = isSelected
        ? "bg-blue-600 text-white px-4 py-1 rounded-full cursor-pointer"
        : "bg-blue-100 text-blue-600 px-4 py-1 rounded-full cursor-pointer";

    const handleSelect = () => {
        if (isSelected) {
            dispatch(tagRemoved(title)); // selected thakle tag removesd action dispatch korbo .. 
        } else {
            dispatch(tagSelected(title));// action.payload er moddhe expect kortese .. 
        }
    };

    return (
        <div className={style} onClick={handleSelect}>
            {title}
        </div>
    );
}
