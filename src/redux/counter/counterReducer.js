import { DECREMENT, INCREMENET } from "./actionTypes";

const initialState = {
    value: 0,
};

// nam dicchi function er
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENET:
            return {
                // updated state return korbo
                ...state,
                value: state.value + 1,
            };

        case DECREMENT:
            return {
                ...state,
                value: state.value - 1,
            };

        default:
            return state;
    }
};

export default counterReducer; // function ta export kore dilam

// jokhon amra reducer ta ke use korbo .. ba create korbo store .. tokhon amra
// ei file theke reducer ta niye jabo ..
