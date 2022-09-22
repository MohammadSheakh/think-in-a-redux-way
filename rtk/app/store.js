const configureStore = require("@reduxjs/toolkit").configureStore;
const counterReducer = require("../features/counter/counterSlice");
const dynamicCounterReducer = require("../features/dynamicCounter/dynamicCounterSlice");
const { createLogger } = require("redux-logger");

const logger = createLogger();

// configure store
const store = configureStore({
    reducer: {
        counter: counterReducer,
        dynamicCounter: dynamicCounterReducer,
    },
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(logger), // return korar shomoy tar function ta ke call kore nibo
    // tahole tar array gula ke peye gelam ..tar por tar shathe ami amar ta add kore dibo
});
// reducer property er moddhe reducer gula diyechilam .. ekhon middleware property er moddhe middleware
// gula dibo
// ei middleware jinish ta ki .. eita ekta function .. jei function ta return korbe .. shomosto
// middleware gula
// redux toolkit by default nije .. kichu middleware use kore ..ami jodi amar middleware er new list
// diye dei .. taile kintu tar gula overwrite hoye jabe .. tokhon amader application kaj korbe na ..
// she jonno tar gula ke rekhe dite hobe .. plus amader gula tar shathe jok kore dite hobe ..
// ei jonnoi ei function er moddhe tar default middleware gula diye dey ..
// function er callback e getDefaultMiddlewares nam er ekta jinish pabo... shei ta hocche ekta function
// shei ta ke jodi ami call kori ..tahole ami tar default middleware gula peye jabo ..tar por ami
// amar gula concat kore dibo .. tailei hobe ..

module.exports = store;
