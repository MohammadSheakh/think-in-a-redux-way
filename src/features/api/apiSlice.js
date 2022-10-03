import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// react theke na nile hook pabo na .. node.js er jonno /query theke nite hoy
import { userLoggedOut } from "../auth/authSlice";

// amra jani proti ta request e base query er moddhe diye jay .. prepareHeaders function ta prottek ta khetre ek bar
// kore call hoy..
const baseQuery = fetchBaseQuery({
    // er moddhe amader ekta object bole dite hoy
    baseUrl: process.env.REACT_APP_API_URL, // baseUrl ta amra env file theke niye ashbo
    /**
     * shei kaj ta korar jonno amra fetchBaseQuery er notun ekta jinish niye kaj korbo
     * amra request header e kaj korchi .. tar mane etar jonno tar ekta prepareHeaders nam e arrow function ase ..amra ekhane
     * async function erokom nite pari .. shei function er moddhe parameter e .. amra kichu jinish potro pai .. ekta
     * hocche headers .. request er default je header gula.. and arekta object ami pai . shekhane getState ar currently
     * amar jei endpoint ta running .. jemon dhoren apni /api e hit korechen .. taile tokhon endpoint hobe /api ..
     * mane end points gula hocche shoja kothay .. features jegula ase .. jemon authApi er khetre apnar endpoints
     * hote pare .. register ba login .. to , apni jodi kono endpoint specific kaj korte chan .. she jonno she apnake
     * endpoint tao diye diyeche .. je apni dhoren chacchen .. specific endpoint jodi shudhu matro inbox hoy .. tahole
     * ami shudhu matro access token pathabo .. shetao apni korte paren .. amra eta checking na kore .. access token
     * available thaklei amra pathiye dibo amader khetre ..
     * so erokom ekta function she amake diye dicche .. shei function theke jodi ami ekta updated headers return kore
     * dei .. taile oi headers tai ultimately jabe .. prottek ta request er shathe ..
     */
    // amra jani proti ta request e base query er moddhe diye jay .. prepareHeaders function ta prottek ta khetre ek bar
    // kore call hoy.. and she dekhbe amar user eta ke customize kore diyeche kina
    prepareHeaders: async (headers, { getState, endpoint }) => {
        // tai er vitor e amake check korte hobe .. jodi amar state er moddhe already accessToken theke thake ?
        // tahole ami header er shathe Authorization Header ta add kore pathiye dibo ..
        const token = getState()?.auth?.accessToken; // jehetu optional chaining use korsi .. so, na thakle undefined thakbe
        if (token) {
            // jodi token exist kore .. tahole ami header er shathe dhukiye dibo ..
            headers.set("Authorization", `Bearer ${token}`); // header er nam hocche Authorization
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

    // amra jani proti ta request e base query er moddhe diye jay .. prepareHeaders function ta prottek ta khetre ek bar
    // kore call hoy.. and she dekhbe amar user eta ke customize kore diyeche kina
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
