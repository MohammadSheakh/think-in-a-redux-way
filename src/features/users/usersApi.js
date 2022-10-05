import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (email) => `/users?email=${email}`,
            // database er users node e amra hit korbo ..  filter kore fellam
        }),
    }),
});

export const { useGetUserQuery } = usersApi;
/**
 * user jokhon e ekta email entry dibe .. tokhon ami request pathiye dekhe bolte parbo
 * oi user adou data base e ase kina .. tarpor ami ta ke message send korte dibo ..
 * otherwise ta ke error diye dibo ..
 */
