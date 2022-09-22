const configureStore = require("@reduxjs/toolkit").configureStore;
const counterReducer = require("../features/counter/counterSlice");

// configure store
const store = configureStore({
    // etao ekta object expect kore ..
    reducer: {
        // er moddhe multiple reducer dite pari ..
        counter: counterReducer, // iccha moto nam dite parbo
        // jokhon e notun feature add hobe .. amra ekta kore reducer ekhane add kore dite pari
    },
});

module.exports = store; // onno file e jeno use korte pari

// ager video te counter slice ta banaisilam .. ebar amra configure korbo .. store ta ke ..

//
