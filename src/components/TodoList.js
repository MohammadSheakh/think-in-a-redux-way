import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchTodos from "../redux/todos/thunk/fetchTodos";
import Todo from "./Todo";

export default function TodoList() {
    const todos = useSelector((state) => state.todos);
    const filters = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    // useEffect e ekta callback function dite hoy ... 
    // ekta dependency dite hoy ... and ei jayga ta te 
    // ekhon amar dispatch korar proyojon hobe ... 
    // karon thunk function ta to amake dispatch korte hobe 
    // useDispatch hook niye ashlam.. 
    useEffect(() => {
        dispatch(fetchTodos);
        /**
         * age amra action dispatch kortam .. ekhon amra 
         * thunk function dispatch korte pari ... 
         * 
         * tar mane jokhon e component ta load hobe .. 
         * tokhon e onLoad e ... fetchTodos ta dispatch hobe 
         */
    }, [dispatch]); // dependency te ki , keno dite hoy .. sheta vule gesi... 

    const filterByStatus = (todo) => {
        const { status } = filters;
        switch (status) {
            case "Complete":
                return todo.completed;

            case "Incomplete":
                return !todo.completed;

            default:
                return true;
        }
    };

    const filterByColors = (todo) => {
        const { colors } = filters;
        if (colors.length > 0) {
            return colors.includes(todo?.color);
        }
        return true;
    };

    return (
        <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
            {todos
                .filter(filterByStatus)
                .filter(filterByColors)
                .map((todo) => (
                    <Todo todo={todo} key={todo.id} />
                ))}
        </div>
    );
}
