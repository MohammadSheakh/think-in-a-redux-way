const { DDECREMENT, DINCREMENT } = require("./actionTypes");
const { INCREMENT } = require("../counter/actionTypes");

// initial state
const initialState = {
    count: 0,
};

// reducer
const dynamicCounterReducer = (state = initialState, action) => {
    switch (action.type) {
        case DINCREMENT:
            return {
                ...state,
                count: state.count + action.payload,
            };

        case DDECREMENT:
            return {
                ...state,
                count: state.count - action.payload,
            };

        case INCREMENT:
            return {
                ...state,
                count: state.count + 1,
            };
        /**
         * extra reducer bujhte hole .. emon vabe bujhte hobe ..,dhoren apnar jokhon
         * counter er action gula dispatch hobe .. emon jodi korte chan .. jokhon  apni
         * counter er value 1 baraben .. tokhon jeno dynamic counter er value o 1 bere
         * jay..
         *
         * kono ekta action dispatch hole .. sheta shob reducer er kasei jay ...
         * tai je khane kaj korte chacchi .. shekhan e shei action er jonno
         * kaj ta likhe dilei hobe
         */

        default:
            return state;
    }
};

module.exports = dynamicCounterReducer;
