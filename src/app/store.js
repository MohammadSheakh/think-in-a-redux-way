import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice"; // apiSlice ta ene fellam 

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // nam value pair dite hoy 
        // nam ta ami niye ashte chai ... apiSlice er jei reducerPath diyechi .. shetai .. 
    },
    /**
     *  store er moddhe amar middleware lagbe .. karon cashing , re validation eto kichu to kono
     * karon chara to korbe na ..tai kichu middleware amader lagbe .. jetao amader temon likhte 
     * hobe na... 
     */
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware), // apiSlice er middleware kintu amra 
        // banai nai .. eta autimatically generate hoyeche .. 
});
