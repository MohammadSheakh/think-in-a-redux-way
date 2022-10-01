import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

// API gula rakhar jonno authApi.js file ..

// authApi ei nam e ekta jinish ekhan theke export kore dicchi .. shetar jonno amader jei apiSlice ta ase ..
// sheta ke tene anbo .. .injectEndpoints nam e she ekta helper function diye diyeche ..
// amra apiSlice alada ekta file e baniyechi .. oi ta hocche amar common apiSlice .. root file ...
// ekhon endpoints gula ke shei file e likhe rakhle biroktikor .. tumi jodi modular kore rakhte chao .. sheta
// korte paro .. ei khetre.. apiSlice jei instance ta ase .. shetar moddhe just inject kore diba .. endpoints
// gula .. oi file theke
export const authApi = apiSlice.injectEndpoints({
    // er moddhe ekta object diye .. shekhan e endpoints gula bolte parbo
    endpoints: (builder) => ({
        // eta ekta object expect kore .. er moddhe function diye bole dite hoy .. era hook retun kore ..
        // jei hook gula Component theke call kora jay .. tara shekhan e ei function gula amader ke dey
        // 🎯 authSlice er action ekhane dispatch korte hboe  korte hobe ..
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (err) {
                    // do nothing
                }
            },
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (err) {
                    // do nothing
                }
            },
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
