import { createSlice } from "@reduxjs/toolkit";

// redux toolkit er common action gula .. jegular shathe API er shomporko nai ..jevabe amra ekdom shurur dike
// baniyechilam .. shegula hocche slice gula ..

//  register / login korar time e slice er moddhe information rakhar je bepar ta .. sheta hote pare .. amader
//  jei auth slice ase .. shekhan e amra ekhon porjonto kono action dispatch kori nai .. ekhon porjonto amader
//  kono initial state nai .. ekhan e amra korbo
/**
 * amra jeta korbo .. amader jei auth Slice ta ase .. shekhan e amra kon structure e data rakhbo .. sheta bole
 * dicchi initialState e ..
 */

const initialState = {
    accessToken: undefined, // by default
    user: undefined,
};
// jehetu auth Feature ..
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // kono reducer thakle .. sheta ekhane bole dite hoy
        // ekhane duita reducer likhe felbo .. shei onujayi amar action.payload e jokhon user log in hoye jabe ..
        // tokhon initialState er information gula she payload e diye dibe ..tokhon jeno shei information gula
        // niye amar state ta update kore felte pari ..
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        // ei nam ei action export korte hoy amader ke ..🔥 ei action gula dispatch kore dibo amra
        userLoggedOut: (state) => {
            state.accessToken = undefined;
            state.user = undefined;
        },
    },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions; // amader ke named export korte hoy
export default authSlice.reducer;
/**
 *  ei slice gula hocche jodi amar kono assistant .. normal redux action gula proyojon hoy ..reducer
 *  gula proyojon hoy .. jegula apni local state e change korben .. local redux state e .. jetar shathe
 *  API call er shomporko nai .. manually jei action gula amra dispatch kori .. manual action gula ke
 *  rakhar jonno ami protitar shathe amra ekta kore Slice file rekhechi .. Shob feature e amader slice
 *  file proyojon na o hote pare .. proyojon na hole .. amra slice file delete  kore dibo ..
 *
 * egula jehetu amader hoye gelo .. taile finally amra amader store ta ke thik kore felte pari ..
 */
