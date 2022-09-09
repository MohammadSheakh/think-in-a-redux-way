// redux folder er root e amra store ta create korlam...
// karon store.js file amra amar full application e common
// counter feature er moddhe sheta pore na .. onnano shob reducer o kintu ei store
// er moddhei ashbe
// amar full application er store kintu ektai thakbe
import { createStore } from "redux";
import counterReducer from "./counter/counterReducer";

const store = createStore(counterReducer); // store er moddhe amake reducer function
// ta pass korte hoy

export default store; // store ta keo export kore dilam

/**
 * amar shob kichui ready .. ekhon shudhu amar react application ke ei store ta
 * provide korte hobe >>> Provider >>>
 */
/**
 * root app.js ke somehow provide kore dite hobe redux store ta .. provider ta
 * react-redux package amader ke diye diyeche
 */
