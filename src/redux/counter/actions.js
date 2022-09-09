import { DECREMENT, INCREMENET } from "./actionTypes";

// action creator gula ekhane thakbe

export const increment = (value) => {
    // action return kore
    return {
        type: INCREMENET,
        payload: value,
    };
};

export const decrement = (value) => {
    return {
        type: DECREMENT,
        payload: value,
    };
};
