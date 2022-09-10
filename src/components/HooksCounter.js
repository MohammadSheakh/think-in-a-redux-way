import { useSelector } from "react-redux";

function HooksCounter({ id }) {
    // selecting er beparta dekhlam .. shamne dispatching er bepar ta dekhbo

    // useSelector .. she state theke kono kichu select kore dey
    // shey chay .. vai amake ekta function deo .. tomar function use kore .. ami ashole tomake ..
    // select kore dibo tomar state theke .. amra oke state dilam .. she amader ke state er value ta
    // return kore dilo ..

    const count = useSelector((state) => state.value);

    return (
        <div className="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
            <div className="text-2xl font-semibold">
                {count} - {id}
            </div>
            {/* <div className="flex space-x-3">
                <button
                    className="bg-indigo-400 text-white px-3 py-2 rounded shadow"
                    onClick={increment}
                >
                    Increment
                </button>
                <button
                    className="bg-red-400 text-white px-3 py-2 rounded shadow"
                    onClick={decrement}
                >
                    Decrement
                </button>
            </div> */}
        </div>
    );
}

export default HooksCounter;
