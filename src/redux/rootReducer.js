import { combineReducers } from "redux";
import counterReducer from "./counter/counterReducer";
import dynamicCounterReducer from "./dynamicCounter/dynamicCounterReducer";

// function er moddhe amra ekta object dicchi ..
// its like key value pair
/**
 * eta ashole ekhon amar full state .. tar moddhe counter er moddhe amar counter er
 * value ta ase ... ar dynamicCounter er moddhe amar dynamicCounter er value ta ase ...
 * so access korte hole... state.couter.value .. abar state.dynamicCounter.value
 */
const rootReducer = combineReducers({
    counter: counterReducer,
    dynamicCounter: dynamicCounterReducer,
});

export default rootReducer;
