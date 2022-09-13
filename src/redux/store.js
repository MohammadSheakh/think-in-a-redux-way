import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";

// create our first middleware
const myLogger = (store) => (next) => (action) => {
    // myLogger middleware ta hobe ekta function ..curried function..
    // first parameter e store ta ke receive kore .. sheita abar arekta function ke return kore .. sheita
    // abar next nam e ekta jinish receive kore .. finally eita arekta function ke return kore .. sheta
    // hocche action ..  finally amra 3 ta jinish e pabo .. amra basically store er reference ta pabo ..
    // jeno amra store.getState ... store.dispatch korte pari .. jeta amra vanilla redux er tutorial e
    // dekhechilam .. so, store er object ta amra kintu peye jacchi ...

    // next jei jinish ta .. amra jani middleware mane ki ? reducer e dhokar agei ami kintu atke felechi..
    // atke je felechi .. charte to hobe .. shei charar jinish ta hocche next .. ami chaile charteo pari
    // ami chaile na return kore atkeo dite pari ..

    // ar action hocche .. jei action ta call kora hoyechilo .. i mean .. user to ekta action ghotieche ..
    // amra kintu action ta receive korechi ..kore ami dhore felechi arki .. reducer er kase jete dey nai
    // shetar reference tao ekhane ase ... so ekhon ami ja iccha korte parbo ..

    // kon action ta ashse sheta jante chacchi
    console.log(`Action: ${JSON.stringify(action)}`); // action ta jehetu ekta object .. tai JSON.stringify
    // er moddhe pass kore dilam .. jeno console e object object na dekhay ..
    console.log(`Before: ${JSON.stringify(store.getState())}`); //ager state ta ki chilo sheta jante chacchi
    // akhono jehetu reducer ... state update koreni .. current state ta pelam arki

    const upcomingState = [action].reduce(rootReducer, store.getState());
    // amader action er jei array .. shei action array ke reduce function .. reduce kore .. single
    // updated state ta return kore .. 2nd parameter e current value ta bole dite hoy .. tai store.getState()
    // call kore current state ta bole dilam... initial value bole dilam

    console.log(`Upcoming State: ${JSON.stringify(upcomingState)}`);

    // pass action
    return next(action); /// ei line na likhle action ta atke jabe .. shetao amra manually kore dite pari
};

const store = createStore(rootReducer, applyMiddleware(myLogger));
// applyMiddleware er moddhe amra multiple middleware dite pari.. ekhon amra ekta
// middleware dekhbo .. pore amra multiple middleware dekhbo

// myLogger nam e ekta middleware banabo ..

export default store;

/**
 * curring jinish ta ki
 * function multiply(a, b, c){
 *      return a*b*c;
 * }
 * console.log(multiply(1,2 , 3));
 * 6
 *
 * curried function er moddhe 3 ta parameter ami receive korte parbo na ..parameter amake 1 tai receive
 * korte hobe
 *
 * function curriedMultiply(a){
 *      return function (b){
 *          return function (c) {
 *              return a*b*c;
 *          }
 *      }
 * }
 *
 * console.log(curriedMultiply(1)(2)(3))
 *
 *
 */
