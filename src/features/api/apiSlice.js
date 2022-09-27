import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// createApi nam e she amader ke ekta function diye diyeche ..
// arekta jinish ke niye ashbo sheta hocche fetchBaseQuery ...
/**
 * amra amader application e api ta ke ekta feature hishebe chinta korchi
 * and shei API er ekta slice banacchi .. API related shob kichu ke amra
 * ekta feature dhorchi ..
 */
export const apiSlice = createApi({
    // ekta object she expect kore .. shekhane ...
    reducerPath: "api", // name type er ..
    /**
     * eta amra keno use korbo .. amader je store er reducer er moddhe
     * different different nam diye je reducer dite hoy na .. amra ekta
     * nam dei .. ar value dei .. shei jinish tai .. nam hishebe ki nam
     * dite chai .. sheta amar ekhane bole dite hobe ..  na dile by default
     * dhore nibe API ...
     */
    baseQuery: fetchBaseQuery({
        // amader jei api request ta amra korbo .. amader application e
        // amader jei server er API URL .. sheta localhost:9000 port e
        // sheta running .. 10 ta API call korle .. shob jaygay kintu ek e
        // url ..
        baseUrl: "http://localhost:9000", // axios er moto ...
        // control space dile aro ki ki jinish , she dite pare .. shegular
        // list pabo amra ekhane ... ekhane amra fetch function dite pari
        // ekhane jodi fetch function use korte chai .. tahole fetch function
        // likhe .. ekta fetcher likhte pari ...

        // rtk query er butiful jinish ta hocche amader ke manually kono
        // fetch query likhtei hobe na ... by default she browser er
        // fetch API e use korbe ...  jehetu she client side ..
        // RTK query server side eo use kora jay ...
        // manually jodi Axios use korte chan .. ba onno kono fetcher library
        // use korte chan .. tahole fetch function ta use korte paren .. doc dekhte hobe ..
        /**
         * jokhon request pathabo .. tokhon automatic prottek request er shathe
         * ekta kore access token chole jabe .. header e ekta jwt web token
         * chole jabe ..
         * credentials ase .. apni jodi pathate chan .. taile cookie jeno jay..
         * apnar request er shathe ..
         * prepare headers ase ...aamra chaile ekhan theke header pathate pari ..
         *
         */
    }),
    tagTypes: ["Videos", "Video", "RelatedVideos"],
    /**
     * baseQuery er pore third jei jinish ta amake dite hobe ... sheta hocche end-points ..
     * amar application e joto end-point ase .. joto API ase.. amra age joto gula feature ase ..
     * shob gular jonno API file banatam .. tar vitore data load korar / fetch korar / axios er /
     * maddhomeo hote pare ... shei kaj ta koram ...  shei gula ekhon amra ei khane korbo ..
     * like getVideos, addVideos, UpdateVideos, DeleteVideos .. ei gula ..
     * ...................... eita abar builder pattern ta follow kore ...eta ultimately ekta callback
     * function .. erokom dey .. oi jinish gulai apni ekhane list kore diben ... ekhane builder pattern
     * follow korte hobe ... builder ta ultimately ekta object return korbe arki ..
     */
    endpoints: (builder) => ({
        // ei jaygay amra amader sob end point gula likhbo .. object er moddhe end point gula likhte hobe
        // ebar ami store er reducer e kaj korbo ..
        // ami shudhu end points likhesi .. proyojonio reducer tara baniye niyeche ..
        /**
         * loading state, success state handle korar jonno amra reducer likhtam na .. shei gula kichui
         * amader likhte hobe na ...
         * ei object ta ke ami createApi er vitor diye niye gesi .. jeno ami reducer peye jai ...
         * proyojonio middleware peye jai .. egula amake manually likhte hobe na ..
         * loading state .. hen ten .. shob e amra beautifully handle korte parbo .. kivabe ..
         * createApi diye banale reducer she automatically she create kore niyeche ...
         * store er moddhe amar middleware lagbe .. karon cashing , re validation eto kichu to kono
         * karon chara to korbe na ..tai kichu middleware amader lagbe .. jetao amader temon likhte
         * hobe na...
         *
         */
        /**
         * er por amra end point likhbo .. amader bivinno api .. end point e connect korbo ..
         * tar por hook diye she jinish gula ke access korbo ..
         */
        getVideos: builder.query({
            /**
             * amader jei home page ta ase .. shekhan e amar video load kore ante hobe .. er jonno amar
             * API dorkar ..getVideos hocche amar API er nam .. API ta bananor jonno .. she shob kichu ke
             * query er moto kore chinta kore .. amra server theke data ani .. etao ekta query .. amra
             * server theke ekta single data ani .. etao ekta query .. ar jeita she data ke poriborton
             * kore .. sheita ke boli mutation .. post , put , patch , delete .. egula shob hocche mutation
             * jei request ta server er data change kore dibe ... sheta ke she bole mutation ..
             * and jei jinish ta server theke shudhu data anbe ..sheta ke bola hoy query...
             */
            query: () => "/videos", // ei tukui bare minimum
            // query te amra bole dibo , actually amra query te ki dibo ... base URL agei bole deowa ase
            // query te URL er porer ongsho tuku amra bolte parbo ..
            // ekta function .. jeta return kore ekta string ..
            // amra ekta API Route banalam.. route ta bananor jonno tar diye deowa builder.query() function ta use korchi
            keepUnusedDataFor: 600, // by default eta 60 thake .. mane 1 minute .. 
            // ami 5 dile .. eta 5 second porei data re-fetch korbe ..  same page e thakle ...
            // un used er calculation shuru hobe na .. onno page e gele .. count down shuru hobe .. 
            providesTags: ["Videos"],
        }),
        /**
         * ekhon kotha hocche ei getVideos to automatic call hobe na ..eta ke call korbo kivabe
         * amra jokhon async thunk baniyechilam .. tokhon kintu thunk function gula ke dispatch kortam ..
         * Component theke .. ekhon amra hook use korbo .. jokhon e amra erokom likhbo .. tokhon e shathe
         * shathe she ekta hook baniye fele .. amra jani hook ki diye shuru hoy .. use diye shuru hoy
         */
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
            providesTags: (result, error, arg) => [{ type: "Video", id: arg }],
        }),
        getRelatedVideos: builder.query({
            // ?title_like=boom&title_like=nice&_limit=4
            query: ({ id, title }) => {
                // eta ekta function .. ekta URL er path return kore dite hobe .. 
                const tags = title.split(" "); // title hocche ekta sentence .. eta ke split kore 
                // word e vag kore nite hobe .. tags er ekta array create hoye gese .. 
                const likes = tags.map((tag) => `title_like=${tag}`); // ekta array ke arekta array 
                // te convert korte pari .. map use kore .. 
                const queryString = `/videos?${likes.join("&")}&_limit=4`; // array ke to string e
                // convert korte hobe ... array.join() method call kore string banate pari 
                return queryString;
            },
            providesTags: (result, error, arg) => [
                { type: "RelatedVideos", id: arg.id },
            ],
        }),
        /**
         * amra ekhon porjonto bivinno dhoroner get request korechi .. and shegula shob automatic
         * hoyeche . but onek khetrei erokom automatic vabe amader kaj hoy na .. manual kichu kaj
         * kora lage .. configuration kora lage .. customization kora lage ..so, sheta korte gelei
         * amra RTK QUERY er kichu advance feature shomporke janbo ..
         * 
         * refetch er default time hocche 1 minutes .. mane hocche 1 minute er moddhe 
         * previous page e gele ...fetch hobe na .. ager content e dekhabe .. kintu 1 minute pore 
         * previous page e gele .. data server theke abar fetch hobe .. 
         */
        addVideo: builder.mutation({
            query: (data) => ({
                url: "/videos",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Videos"],
        }),
        editVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "Videos",
                { type: "Video", id: arg.id },
                { type: "RelatedVideos", id: arg.id },
            ],
        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Videos"],
        }),
    }),
});

export const {
    useGetVideosQuery,
    useGetVideoQuery,
    useGetRelatedVideosQuery,
    useAddVideoMutation,
    useEditVideoMutation,
    useDeleteVideoMutation,
} = apiSlice;

/**
 * ekhon kotha hocche ei getVideos to automatic call hobe na ..eta ke call korbo kivabe
 * amra jokhon async thunk baniyechilam .. tokhon kintu thunk function gula ke dispatch kortam ..
 * Component theke .. ekhon amra hook use korbo .. jokhon e amra erokom likhbo .. tokhon e shathe
 * shathe she ekta hook baniye fele .. amra jani hook ki diye shuru hoy .. use diye shuru hoy
 *
 * amra end point likhlam .. she sheta ke hook baniye amader ke dicche .. hook ta amra jekono component
 * e use korte parbo
 */
