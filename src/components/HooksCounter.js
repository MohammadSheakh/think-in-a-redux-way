import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../redux/counter/actions";

// amar to action dispatch kora niyei kotha ... tai action gula ke niye ashlam ...
// default export hishebe na thakle .. { } er moddhe nite hobe ..

function HooksCounter() {
    const count = useSelector((state) => state.value);
    const dispatch = useDispatch();

    const incrementHandler = (value) => {
        dispatch(increment(value)); // increment () ke call kore dile action object ta pai ..
    };

    const decrementHandler = (value) => {
        dispatch(decrement(value));
    };

    return (
        <div className="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
            <div className="text-2xl font-semibold">{count}</div>
            <div className="flex space-x-3">
                <button
                    className="bg-indigo-400 text-white px-3 py-2 rounded shadow"
                    onClick={() => incrementHandler(5)}
                    // jokhon e click korbe .. tokhon e ei function ta call hobe
                >
                    Increment
                </button>
                <button
                    className="bg-red-400 text-white px-3 py-2 rounded shadow"
                    onClick={() => decrementHandler(2)}
                >
                    Decrement
                </button>
            </div>
        </div>
    );
}

export default HooksCounter;
