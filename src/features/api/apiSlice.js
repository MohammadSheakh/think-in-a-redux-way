import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// react theke na nile hook pabo na .. node.js er jonno /query theke nite hoy
import { userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
    // er moddhe amader ekta object bole dite hoy
    baseUrl: process.env.REACT_APP_API_URL, // baseUrl ta amra env file theke niye ashbo
    prepareHeaders: async (headers, { getState, endpoint }) => {
        const token = getState()?.auth?.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

// apiSlice function likhtesi
export const apiSlice = createApi({
    // createApi function er moddhe ekta object dite hobe
    reducerPath: "api",
    // baseQuery:fetchBaseQuery() // jevabe amra axios e base URL set kori .. ei base query diye amader shob query ghure ashe
    // eta hocche amader base class .. eta ke extend kore amra onno API gula banai
    baseQuery: async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 401) {
            api.dispatch(userLoggedOut());
            localStorage.clear();
        }
        return result;
    },
    tagTypes: [], // tagTypes amra rakhte pari .. ekhon porjonto .. amra blank array nicchi
    // joto wite listed tags ase .. jeta amra cash invalidation er jonno kori ..
    endpoints: (builder) => ({}), // er pore endpoints nam er ekta jinish thake .. jeta hocche main jinish
    // shekhan e builder pattern follow kora hoy .. and ekhan theke amake ekta object return korte hoy

    // amra to endpoints gula ekhane rekhechi .. alada file e rakhle bujhbe kivabe.. she bujhte parbe
});
/**
 * amader application er joto endpoints ase .. ekhon porjonto amra jeta jani .. shob endpoints ekhane likhar
 * kotha ..amar jodi 500 api URL thake .. shob same file e lekha .. jinish ta thik logical hocche na ..
 * API tai tokhon onek boro ekta feature hoye jacche ..
 *
 * amader ekhane authentication kintu ekta alada feature ..
 * Authentication API er jonno kintu amar 4/5 ta API lagbe .. login , register, add user
 * Messages Feature er jonno o kintu amar multiple API lagbe ..
 *
 * ek ekta feature er jonnno API file gula alada rakha gele onek valo hoito ..end point gula alada jaygay rakha
 * gele valo hoito ..eta ke RTK Query te bole code splitting ..
 *
 * end point gula amra ekhane likhboi na .. ekhane amra ekta blank object e diye chole jabo ..
 * ekhon ami ekta external file e ei kaj ta korbo ..
 *
 * Features er moddhe amader ki ki feature thakte pare ..ekta auth, conversation, messages, users
 * conversation add kora jete pare .. shob kichu kora jete pare ..
 */
