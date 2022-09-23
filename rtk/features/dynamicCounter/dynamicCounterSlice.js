const { createSlice } = require("@reduxjs/toolkit");
const { counterActions } = require("../counter/counterSlice");

// initial state
const initialState = {
    count: 0,
};

const dynamicCounterSlice = createSlice({
    name: "dynamicCounter",
    initialState,
    reducers: {
        increment: (state, action) => {
            state.count += action.payload;
        },
        decrement: (state, action) => {
            state.count -= action.payload;
        },
    },
    // extraReducers: {
    //     ["counter/increment"]: (state, action) => {
    //         state.count += 1;
    //     },
    // },
    extraReducers: (builder) => {
        builder.addCase(counterActions.increment, (state, action) => {
            state.count += 1;
        });
    },
    /**
     * ei property te amader ke respond korte hobe ..ekhane amra extra reducer
     * gula bole dite pari .. jegula ashole respond korbe .. ekhane [''] ei vabe
     * bolte hobe .. jevabe amra dynamic object er nam dei arki .. er moddhe
     * action er nam bole dite hobe .. er pore reducer function bole dite hobe
     * function ta state and action receive kore .. ar state ta update kore dey
     * shorashori muted korte pare
     *
     * eta middleware er maddhome korse .. default middlewares er ekta middleware
     * hocche extraReducers handle korar middleware
     * -----------------------------------------------------------
     * nam ta hardcode korchi .. eta ektu problematic .. amra evabe kaj korte
     * chai na ..ei jonno recomended ekta way ase .. sheta hocche ..
     * amra ekta function use korte pari .. ei function receive kore builder nam
     * er ekta jinish .. jekono nam ei receive kora jay .. amra builder nam ei
     * receive korlam .. etai recomended way .. ei builder er maddhome ami ekta
     * case create korte pari .. er first parameter e action er nam bole dite hobe
     * and second parameter e reducer er function ta bole dite parbo ..
     *
     * action ta ke import kore niye ashbo ..
     */
});

module.exports = dynamicCounterSlice.reducer;
module.exports.dynamicCounterActions = dynamicCounterSlice.actions;
