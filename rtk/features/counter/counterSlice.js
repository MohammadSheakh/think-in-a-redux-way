// RTK er khetre amader ke feature onujayi chinta korte hobe .. eta hocche convention

const createSlice = require("@reduxjs/toolkit"); // amra slice banabo ..
// full jinish ta ekta pizza .. etar ekta slice holo .. counter ..

// initial state
const initialState = {
    count: 0,
};

const counterSlice = createSlice({
    // counterSlice bananor jonno jei method ta import kore niye ashsi
    //eita ekta object receive kore ..
    name: "counter", // slice tar nam dibo
    initialState, // initial state bole dite hobe ..
    reducers: {
        // reducer gula  bole dite hobe ..
        increment: (state, action) => {
            // amra jani reducer function .. state ar action receive kore ..
            // anonymous function dibo .. jei nam ta dibo .. shetai hobe amar
            // action er nam .. ekhon action creator ar action type vule jabo
            // ekhane ager moto return kichui kora lagbe na .. ekhane just kaj
            // ta kore dilei hobe .. ager moto immutably kaj kore new object
            // return kora lagbe na ..mane updated state return kora lagbe na
            // behind the scene .. she IMMER Package use kore
            // immutable kaj ta toolkit nije kore felbe .. amake chinta korte hobe na
            state.count++;
        },
        decrement: (state, action) => {
            state.count--;
        },
    },
});

modules.exports = counterSlice.reducer;
// ekhan theke amra actions ta kivabe pabo .. named export jevabe kori ..
modules.exports.counterActions = counterSlice.actions;
