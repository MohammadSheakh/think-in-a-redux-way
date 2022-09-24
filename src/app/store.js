import { configureStore } from "@reduxjs/toolkit";
import videosReducer from "../features/videos/videosSlice";

export const store = configureStore({
    reducer: {
        videos: videosReducer,
        // amar full global state er moddhe .. videos nam er ekta node er moddhe
        // amader videos feature tar state ta ase ..
    },
});
