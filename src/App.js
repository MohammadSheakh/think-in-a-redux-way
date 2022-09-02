import { useState } from "react";
import Counter from "./components/Counter";
import Stats from "./components/Stats";

// react e state ta immutable e change korte hoy.. mane amra shorashori ei array ta change korbo na
// amra ager array tar ekta copy baniye niye .. tar shathe add korbo .. then finally return kore dibo

// state hishebe amra ekta counter er array nibo ..initial  state e ...
const initialState = [
    {
        id: 1, // prothom counter er id hocche 1 .. count er value 0
        count: 0,
    },
    {
        id: 2,
        count: 0,
    },
];
export default function App() {
    const [state, setState] = useState(initialState); // shob gula counter er ekta state pabo

    // total count nam e ekta function nilam ...
    const totalCount = () => {
        // array er element gula jog korte amra reduce use korte pari
        // (result, protibar ekta kore element / current element / total object ta) => return korbe jeta , initial value );
        return state.reduce((total, counter) => total + counter.count, 0); //🎯🔴📢🔥💘
    };

    const increment = (id) => {
        // react e state ta immutable e change korte hoy.. mane amra shorashori ei array ta change korbo na
        // amra ager array tar ekta copy baniye niye .. tar shathe add korbo .. then finally return kore dibo
        const updatedCounter = state.map((c) => {
            // map new array return kore .. she shorashori array te change kore na ..prottektar moddhe loop o amra korte pari
            if (c.id === id) {
                return {
                    ...c,
                    count: c.count + 1,
                };
            }
            return { ...c }; // naile copied object tai return kore dibo .. eta onek important
        });

        setState(updatedCounter);
    };
    // muted kora mane change kora ...
    const decrement = (id) => {
        const updatedCounter = state.map((c) => {
            if (c.id === id) {
                return {
                    ...c,
                    count: c.count - 1,
                };
            }
            return { ...c };
        });
        setState(updatedCounter);
    };

    return (
        <div class="w-screen h-screen p-10 bg-gray-100 text-slate-700">
            <h1 class="max-w-md mx-auto text-center text-2xl font-bold">
                Simple Counter Application
            </h1>

            <div class="max-w-md mx-auto mt-10 space-y-5">
                {state.map((count) => (
                    <Counter
                        key={count.id}
                        id={count.id}
                        count={count.count}
                        increment={increment}
                        decrement={decrement}
                    />
                ))}
                <Stats count={totalCount()} />
            </div>
        </div>
    );
}
