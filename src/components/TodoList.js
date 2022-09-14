import { useSelector } from "react-redux";
import Todo from "./Todo";

export default function TodoList() {
    const todos = useSelector((state) => state.todos); // useSelector use korte hobe
    // state theke oi ongsho tuku ber kore niye ashbo
    // er moddhe amake ekta selector function dite hoy.. jeta muloto state receive kore
    // state theke amra todos... amader reducer er moddhe amra likhesilam ...
    // todos property er moddhe todos slice ta ase amader .. so amra array ta niye ashlam

    // todos ta hocche amader full ekta array of object

    // amra finally ekhon map korte pari
    return (
        <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
            {todos.map((todo) => (
                // prottek bar ami ekta kore todo pabo
                <Todo todo={todo} key={todo.id} />
                // amra props send korte pari .. amra jeta korte pari .. Todo nam er
                // ekta object er moddhe full todo ta ami pass kore dite pari
                // map jehetu amra use korechi .. amader ke ekta key dite hobe
                // unique ekta selector dite hobe .. tai amra todo.id ta ke amra key
                // hishebe dite pari
            ))}
        </div>
    );
}
