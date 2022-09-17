// Filter Section... 3.7
import { useDispatch, useSelector } from "react-redux";
import { colorChanged, statusChanged } from "../redux/filters/actions";

// formatter // ekta function nicchi ... shetar nam dilam ...
const numberOfTodos = (no_of_todos) => {
    switch (no_of_todos) {
        case 0:
            return "No task";
        case 1:
            return "1 task";
        default:
            return `${no_of_todos} tasks`;
    }
};
/**
 * 1 ->
 * all / incomplete / complete ... egula jokhon .. user select korbe .. tokhon amader
 * state er moddhe filter jei slice ta ase .. shekhane giye filters er moddhe status
 * section e  all / incomplete / complete ... ei jinish ta diye dite hobe ...
 * 2 ->
 * two tasks left ... koyta task ashole incomplete ase .. ekhane amake show korte hobe
 * 3 ->
 * and color select korle .. filter slice er moddhe jei colors namok property ta ase ..
 * shei array er moddhe color assign korte hobe .. othoba .. remove korte hobe ...
 * karon ek e shathe eta toggle er kaj o korbe ..
 */
export default function Footer() {
    // koyta task left .. sheta janar jonno amader todo array ta proyojon
    const todos = useSelector((state) => state.todos);
    const filters = useSelector((state) => state.filters); // state dibe .. state theke
    // ami filters gula ke niye ashbo

    const dispatch = useDispatch(); // action jehetu dispatch kora lagbe .. tai
    // koyta todos left .. baki ase .. sheta amader ber korte hobe
    // jegula complete na .. shegulai left
    const todosRemaining = todos.filter((todo) => !todo.completed).length;
    const { status, colors } = filters; // initial state e jegula chilo ... shegula
    // destructure kore nilam
    // state er moddhe color array ta ki .. ekhane kintu amra peye jacchi

    const handleStatusChange = (status) => {
        // ekhane amader ki korte hobe .. amader jehetu ekhon  filter section e kaj ..
        // tahole amra filter slice e chole jabo .. amra amader actions e chole jacchi
        // ami .. actions er moddhe dekhen statusChanged.. tar ashole shudhu status ta
        // lage arki ... tahole statusChanged action ta amra colen niye ashi ekhane ..
        // sheta dispatch kore dei ..  mane action ta dispatch kore dei
        dispatch(statusChanged(status));
    };

    const handleColorChange = (color) => {
        // actions e gele dekhte parbo .. ekhane tar color ar change type .. duita
        // jinish lage ..

        // check korlei hobe je .. oi Array er moddhe jei color ta pass kora hoyeche
        // sheta ase kina .. color thakle sheta remove korte hobe .. ar jodi na thake
        // taile sheta add korte hobe
        if (colors.includes(color)) {
            // array er includes method ase
            dispatch(colorChanged(color, "removed")); // reducer ta check koren
        } else {
            dispatch(colorChanged(color, "added"));
        }
    };

    return (
        <div className="mt-4 flex justify-between text-xs text-gray-500">
            <p>{numberOfTodos(todosRemaining)} left</p>
            <ul className="flex space-x-1 items-center text-xs">
                <li
                    className={`cursor-pointer ${
                        status === "All" && "font-bold"
                    }`}
                    onClick={() => handleStatusChange("All")}
                >
                    All
                </li>
                <li>|</li>
                <li
                    className={`cursor-pointer ${
                        status === "Incomplete" && "font-bold"
                    }`}
                    onClick={() => handleStatusChange("Incomplete")}
                >
                    Incomplete
                </li>
                <li>|</li>
                <li
                    className={`cursor-pointer ${
                        status === "Complete" && "font-bold"
                    }`}
                    onClick={() => handleStatusChange("Complete")}
                >
                    Complete
                </li>
                <li></li>
                <li></li>
                <li
                    // state theke jei colors array ta ashsilo .. shetar moddhe green color ta ase kina

                    className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
                        colors.includes("green") && "bg-green-500"
                    }`}
                    onClick={() => handleColorChange("green")}
                ></li>
                <li
                    className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
                        colors.includes("red") && "bg-red-500"
                    }`}
                    onClick={() => handleColorChange("red")}
                ></li>
                <li
                    className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
                        colors.includes("yellow") && "bg-yellow-500"
                    }`}
                    onClick={() => handleColorChange("yellow")}
                ></li>
            </ul>
        </div>
    );
}
