import { Provider } from "react-redux";
import Counter from "./components/Counter";
import store from "./redux/store";

export default function App() {
    return (
        // Provider component diye wrap kore dilam // store nam er ekta prop ase ..
        // shekhane bole dite hobe store ta ki ...store tao import kore niye ashte hobe
        <Provider store={store}>
            {/* context API er maddhome store ta full application e diye dicche  
                next kaj action dispatch kora ... 
            */}
            <div className="w-screen h-screen p-10 bg-gray-100 text-slate-700">
                <h1 className="max-w-md mx-auto text-center text-2xl font-bold">
                    Simple Counter Application
                </h1>

                <div className="max-w-md mx-auto mt-10 space-y-5">
                    <Counter />
                    <Counter />
                    <Counter />
                </div>
            </div>
        </Provider>
    );
}
