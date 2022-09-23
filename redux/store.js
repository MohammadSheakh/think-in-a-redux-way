const { createStore, combineReducers } = require("redux");
const counterReducer = require("./counter/reducer");
const dynamicCounterReducer = require("./dynamicCounter/reducer");

const rootReducer = combineReducers({
    counter: counterReducer,
    dynamicCounter: dynamicCounterReducer,
});

const store = createStore(rootReducer);

module.exports = store;
/**
 * extra reducer bujhte hole .. emon vabe bujhte hobe ..,dhoren apnar jokhon
 * counter er action gula dispatch hobe .. emon jodi korte chan .. jokhon  apni
 * counter er value 1 baraben .. tokhon jeno dynamic counter er value o 1 bere
 * jay..
 *
 */
