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
        // 🔗 9.4
        // ekhon amra amader endpoint likhbo
        register: builder.mutation({
            // post request pathabo // ekhane ekta query dite hoy // query function ta amra likhbo
            query: (data) => ({
                //data receive kore .. jeta amra form er body te pathabo .. ekhan theke ekta object return kore dite pari
                url: "/register",
                method: "POST",
                body: data,
            }),
            /**
             * ekhon kotha hocche register er ghotona ta ghota er pore ei kaj ta ami kivabe korbo ..tar mane ki ami register
             * API korlam .. korar pore .. ekta kaj hote pare .. ami amar UI te .. jokhon register Mutation ta ke use korbo
             * amar hook diye . tokhon ami await kore ami kaj ta korte pari .. tar mane amake register e request pathate hobe
             * jodi successfull hoy .. sheta ami amar UI te catch kore kaj ta korte pari ..  but ei ta kintu common ..
             * register: builder.mutation({ }), ei ta successfully houar pore amar kichu kaj ase .. ei dhoroner case e ..
             * ei dependent kaj gula .. mane registration complete houar pore amar duita kaj ase ..
             * 1. ekta hocche amar local storage update kore felte hobe ..
             * 2. arek ta hocche amar redux store update kore felte hobe ..
             * khub valo hoto na .. jodi ami ekhanei promise er moto then catch erokom kichu ekta korte partam
             * UI te eto bar bar check korar ki dorkar ..
             *
             * register request ta pathanor porei amra jodi ekhane kichu korte chai ? successful hole kichu korte chai ..
             * error hoile kichu korte chai .. onQueryStarted() ei nam e ekta asynchronous function diye dite pari ..
             * eta rtk query emneo call kore .. je vai .. tomar query/request shesh hole .. amake vai janaba .. tahole tokhon
             * ami local storage ta update kore felbo  and tokhon ami redux store tao update kore felbo ..mane kichu ekta korbo
             * ei function ta emneo call hoy .. amra just overwrite korchi ..
             *
             * call korar shomoy ekhane kichu jinish pati diye dey .. arg, { queryFulfilled, dispatch}
             * //🎉request er jei argument gula ase .. ei khetre data ta .. jei data ta query function receive kore
             * // arekta object she diye dey .. shekhan e amader state , dispatch .. ei jinish gula thake ..
             * // er vitor e jodi kono kichu dispatch korte hoy .. shetao pai ..
             */
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // ei khane dhuke porsi .. ekhane ekhon ami wait korte pari .. wait korar jonno amader ki lage bolen to ..
                // ekta promise lage .. ei promise tai hocche queryFulfilled ! amra ashole ei query fullfilled promise tar
                // jonno await korbo ... karon eita ekta async function .. await jodi shesh hoy .. tahole porer line
                // execute hoy .. tar mane ..query shotti shotti fulfilled hoile .. amra jante parbo .. jokhon e fulfilled
                // hoye gese .. tokhon kintu amar kase .. argument o ase .. dispatch o ase .. ami chaile ja khushi korte pari

                try {
                    // amra jani async await er khetre amader ke try catch diye error dhorte hoy..
                    const result = await queryFulfilled; // query jodi fulfilled hoy .. amra sheta ke await korbo ..
                    // mane ei khetre amar register .. register route e hit koreche .. she API request koreche ..
                    // register successfull hoyeche .. amake ekta response diyeche .. shei response ta tokhon result
                    // e chole ashbe ..

                    // jodi kono error khay ..taile catch block e dhukbe .. sheta pore handle korbo ..
                    // result peye gele .. ami dispatch call kore ami local state update kore felte pari ..
                    // tar age ami local Storage ke update korbo ..
                    localStorage.setItem(
                        // key value pair dite hoy
                        "auth", // key
                        // local storage e kokhono object rakha jay na .. result er moddhe jinish ta ashe na .. result.data er
                        // moddhe jinish ta dey she .. onek ta axios er moto ..
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                    // local state update korbo ekhon redux er .. auth slice er userLoggedIn action ta dispatch kore dibo
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (err) {
                    // 🎯 do nothing // error ta amra UI theke catch korte parbo .. so ekhane kichu korar nai ..
                    // karon ultimately ei register endpoints ke .. jehetu she ekta hook diye dibe amader ke UI te
                    // ei register function / API ta ke call korar jonno .. so shekhan e destructure kore kintu amra
                    // Error ta peyei jabo ..shetar basis e amra tokhon Content dekhate parbo
                    // chaile ekta console log likhe rakhte paren ..
                }
            },
        }),
        // login endpoints
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
// ekhan theke amra kichu hook pai .. API er EndPoints theke amra kichu hook pai ..

/**
 * regestration korei kintu she amake login kore dey .. karon she amake ashole ekta access token diye dey ..
 * amra authentication ta maintain korbo kivabe ? sign up e press korar pore ami to access token ta peye
 * jabo .. jodi ami shob kichu thik thak moto pai .. er porer kaj ki hobe ? jehetu amader accessToken ta
 * 1 hour expire kore  .. so access token ta amader clinet side e kothao rakhte hobe .. rakhar kaj ta amra
 * local storage e korbo .. cookie diye korte pari .. kintu sheta json -server accept kore na .. best hocche
 * http only cookie te rakha
 *
 * first time jokhon user hit korbe .. tokhon e local storage e dekhbo je user logged in ase ki nai .. er pore
 * information ta ke amader redux state e niye nibe .. er por theke amader redux store theke check korbo ..
 *
 * tahole ami jokhon e login / register kore felsi .. tokhon e jodi ami successfully access token pai .. ar
 * jinish ta jodi amar thik moto request ta successfull hoy .. shetar porer action e kintu .. shetar shathe
 * dependent action hocche .. localstorage e access token and user information ta ami localstorage e dhukiye
 * felbo .. and ek e shathe amar redux store eo ... oi ek e jinish ta ami kono ekta slice e rekhe dibo ..
 * jeno poroborti te .. amader client side browsing er time e.. ami redux store thekei jeno .. authentication
 * er jinish gula nite pari ..
 *
 * register / login korar time e slice er moddhe information rakhar je bepar ta .. sheta hote pare .. amader
 * jei auth slice ase .. shekhan e amra ekhon porjonto kono action dispatch kori nai .. ekhon porjonto amader
 * kono initial state nai .. ekhan e amra korbo
 */

/**
 * ki shikhlam ?  jokhon e amra RTK Query diye .. kono API request korchi .. tokhon .. sheita ke follow korchi
 * amra ashole .. amra queryFulfilled jeta peyechi .. shei promise ta diye ami ashole wait korchi .. follow korchi
 * tumi successfull hole .. amar kichu aditional kaj karbar ase .. ami tola diye kore felbo .. its actually acting
 * like a listener..
 *
 * business logic ke UI te niye na jaowai valo .. endpoint e korai better
 */
