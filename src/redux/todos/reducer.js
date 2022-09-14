import {
    ADDED,
    ALLCOMPLETED,
    CLEARCOMPLETED,
    COLORSELECTED,
    DELETED,
    TOGGLED,
} from "./actionTypes"; // action gula o niye ashte hobe
import initialState from "./initialState"; // state tao import kore niye ashte hobe

// shob cheye boro id er shathe 1 jog korte hobe ..
const nextTodoId = (todos) => {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
    // reduce er moddhe ekta function dite hoy ..tar kaj hocche maximum id ta ber kore
    // niye asha .. (finalResult, each element) => Math.max( eita jeta kore , duita
    // number er moddhe jeta boro sheta return kore ) .. 2nd parameter e initial value
    // bole dite hoy ..
    return maxId + 1;
};

// ektai single function hobe .. jeta hocche state ta receive korbe and action ta
// receive korbe ..

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDED:
            return [
                ...state, // array of object ta ke copy kore niye ashlam
                {
                    id: nextTodoId(state),
                },
            ];

        case TOGGLED:
            // complete thakle incomplete korbo , incomplete thakle complete korbo
            // mane hocche completed true thakle false korbo, false thakle true korbo
            return state.map((todo) => {
                // amake map korte hobe .. jeita change hoise .. sheta change korte hobe
                // protibar ekta kore todo pabo..
                if (todo.id !== action.payload) {
                    // jodi id duita match na kore .. taile to change korar kono dorkar nai ..
                    return todo;
                }

                return {
                    // value toggle kore dibo
                    ...todo,
                    completed: !todo.completed,
                };
            });

        case COLORSELECTED:
            const { todoId, color } = action.payload; // age action.payload theke value destructure kore nilam
            return state.map((todo) => {
                if (todo.id !== todoId) {
                    // id na match korle change korbo na
                    return todo;
                }
                return {
                    // match korle color assign kore dibo
                    ...todo, // immutably copy korlam
                    color: color,
                };
            });

        case DELETED:
            // delete korar shomoy amra filter method ta use kori
            // filter ekta new array return kore .. jei id ta ashse .. sheta bad diye
            // onno gula ke array te push kore .. sheta return kore
            return state.filter((todo) => todo.id !== action.payload);
        // jegula not equal hobe .. shegulai filter kore felsi .. mane ber kore niye
        // ashsi

        case ALLCOMPLETED:
            return state.map((todo) => {
                return {
                    // prottekta todo er complete ke true kore dibo
                    ...todo,
                    completed: true,
                };
            });

        case CLEARCOMPLETED:
            // jegula complete hoyeche .. shegula bad pore gelo ..
            return state.filter((todo) => !todo.completed);

        default:
            break;
    }
};

export default reducer;
