import { loaded } from "../actions";
// todos jeta server theke pacchi ... eta hocche ekta arrays of object

// ekhane amra ekta thunk function likhbo ..
// action dispatch korte dispatch lagbe .. tai receive korlam ..
const fetchTodos = async (dispatch) => {
    // getState jehetu use hocche na ... tai receive korlam na
    // ei function tar kaj hocche todo fetch kore niye asha ..
    const response = await fetch("http://localhost:9000/todos");
    const todos = await response.json(); // string pai .. // json e convert kore nilam
    // actual todos gula pete hole amake json e convert korte hobe ..
    /**
     * ekhon amar kaj hocche actual action ta .. jehetu thunk ki kore ..
     * thunk jokhon amra dispatch kori ..thunk kintu actual
     * action na .. thunk hocche just majh khaner kaj
     * delay korar jonno .. she actual action ta ebar dispatch korbe .. karon tar kase
     * data chole esheche ..  tar kase dispatch function she already
     * parameter e expect kore ase .. take ekhon ekta action call korte hobe
     * ekhon she ki action call korbe .. ekhon kintu load houar pore amar
     * ekta action proyojon hobe ...
     */
    dispatch(loaded(todos)); // thunk function server theke data
    // niye ekta actual action dispatch kore ... reducer tokhon loaded peye
    // state ta update kore fello ..
};

export default fetchTodos;
