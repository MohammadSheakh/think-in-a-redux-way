import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import conversationsSliceReducer from "../features/conversations/conversationsSlice";
import mesagesSliceReducer from "../features/messages/messagesSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        // amra jehetu prottek tar shathe ekta kore slice o diyechi .. shegula keo niye ashte hobe
        auth: authSliceReducer,
        conversations: conversationsSliceReducer,
        messages: mesagesSliceReducer,
    },
    devTools: process.env.NODE_ENV !== "production", // production e thakle devTools false hobe .. tokhon ar devtools kaj korbe na
    middleware: (getDefaultMiddlewares) =>
        // middleware e amader ekta callback deowa lage .. karon amra jani .. ei je eto gula kaj korche she .. definately she kichu default middleware use korche ..
        getDefaultMiddlewares().concat(apiSlice.middleware),
    // tar defaultMiddleware gula she amake diye dey .. tar shathe amar concat kore dite hoy amar nijossho
    // kono middleware jodi thake .. shegula .. karon amra jei apiSlice ta baniyechi .. shetar moddhe amra joto dhoroner rtk query er kaj korbo .. shetar jonno to middleware proyojon hobe
});
/**
 * amra jani je redux dev tool kintu automatic ekhane set up hoye jabe ..eta te amra extra kono configuration kori
 * nai age .. kintu ekta chotto jinish kaje lagbe production e gele . dev tools on thakle .. onno keo amader state management ta dekhte pay
 *
 * kichu middlewares kintu bola lagbe amader ekhane
 */
