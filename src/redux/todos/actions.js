import {
    ADDED,
    ALLCOMPLETED,
    CLEARCOMPLETED,
    COLORSELECTED,
    DELETED,
    TOGGLED,
} from "./actionTypes";

// actionTypes create kora jehetu shesh .. shegula import kore niye ashte hobe
// ekhon action creator banabo amra .. action creator jeta kore .. return kore ekta action
// tar modhe type namok ekta property thake .. payload o thake

export const added = (todoText) => {
    // simple ekta js object she return korbe .. input ta parameter akare receive korechi
    return {
        type: ADDED,
        payload: todoText,
    };
};

// jei todo te press korbo .. sheta toggled hoye jabe ..id lagbe ejonno // complete incomplete
export const toggled = (todoId) => {
    return {
        type: TOGGLED,
        payload: todoId,
    };
};
// kon todo te kon color dibo .. duitai bole dite hobe .. tai duitai parameter hishebe nilam
export const colorSelected = (todoId, color) => {
    return {
        type: COLORSELECTED,
        payload: {
            // ekhane amra ekta object dicchi .. jehetu duita jinish
            // todoId = todoId, // name property same hole next line er moto o likha jay
            todoId,
            color,
        },
    };
};

// kon todo delete korbo .. shetar id ta lagbe
export const deleted = (todoId) => {
    return {
        type: DELETED,
        payload: todoId,
    };
};

export const allCompleted = () => {
    return {
        type: ALLCOMPLETED,
    };
};

export const clearCompleted = () => {
    return {
        type: CLEARCOMPLETED,
    };
};

// arekta feature add kora lagbe .. sheta hocche jegula complete .. shegulai jeno clear
// kore
