const { createSlice } = require("@reduxjs/toolkit");

// initial state
const initialState = {
    count: 0,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        // ei increment , decrement nam gula keo amra action hishebe peye jabo .. erai action creator
        // hishebe kaj kore
        increment: (state, action) => {
            state.count++;
        },
        decrement: (state, action) => {
            state.count--;
        },
    },
});

module.exports = counterSlice.reducer;
module.exports.counterActions = counterSlice.actions;
