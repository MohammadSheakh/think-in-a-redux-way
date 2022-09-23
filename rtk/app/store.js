const configureStore = require("@reduxjs/toolkit").configureStore;
const counterReducer = require("../features/counter/counterSlice");
const dynamicCounterReducer = require("../features/dynamicCounter/dynamicCounterSlice");
const postReducer = require("../features/post/postSlice");
const { createLogger } = require("redux-logger");

const logger = createLogger();

// configure store
const store = configureStore({
    reducer: {
        counter: counterReducer,
        dynamicCounter: dynamicCounterReducer,
        post: postReducer, // new ekta reducer add korlam // postSlice theke niye ashsi
    },
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(logger),
});
/**
 *  age kintu redux thunk theke kintu .. thunk middleware .. niye ashte hoyechilo
 * but ekhane kintu thunk  er jinish ta amader lage nai .. behind the scene ..
 * redux-toolkit .. ei kaj ta kore dibe .. she actually redux-thunk ke niye ashbe
 * getDefaultMiddlewares er moddhe redux-toolkit kintu nije nije kichu middleware
 * push kore .. jokhon e apni asynchronous kono action handle korte jaben
 * she automatically thunk middleware shekhan e niye nibe ..tar mane hocche
 * redux toolkit package er moddhe thunk already deowa ase ..
 *
 * so amra old way of redux e ki kortam .. redux thunk install kortam ..sheta
 * actually amra install korboi na .. jodi amra shudhu redux toolkit package ta
 * amra install kori...
 *
 * amra jodi npm  install redux-toolkit use kori .. tahole amader .. redux
 * redux thunk egula kicui install kora lagbe na ..
 */
/**
 * she apnake error handling kore dicche , shudhu slice er moddhe apnake kaj kore
 * dicche .. apnake action likhte hocche na ..she apnake life cycle event dicche
 * shegula ke apni reducer e shora shori handle kore .. u can handle the state
 * updates ..
 */
module.exports = store;
