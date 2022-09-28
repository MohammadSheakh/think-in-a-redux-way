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
    tagTypes: ["Videos", "Video", "RelatedVideos"], // ekhane amra amader white listed tag gula bole dibo
    // store configure houar shomoy e she bujhe jabe .. amake ei ei tag maintain korte hobe ..
    // er pore amra bivinno request e tag provide korbo..
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
            /**
             * -------------------------------------------
             * Advance Configuration
             */
            // she jei cash ta maintain kore sheta ke add video file er jonno invalidate kore dite hobe
            /**
             * she je cash ta maintain kore .. cash mane ki .. amader je local storage e ekta cash kore data
             * ta rekhe dicche .. and she jokhon tar storage e rakhse .. she definately kono ekta id diye
             * rakhse .. ba kono ekta identifier diye indexing kore rakhse ..evabe chinta korte paren ..
             * /videos ei request tai kintu tar ek matro id ..so ei request er against e .. she dhore nicche
             * amar jodi request URL eitai hoy .. taholei ami shudhu matro omuk cash ta dekhay dibo ..
             *
             * ar  `/videos/${videoId}` er maddhome prottek ta single video jokhon ansen .. tokhon ek ekta
             * video kintu ek ekta dynamic id ..so , dhoren .. videos/1 .. shetar jonno ekta cash ase ..
             * videos/2 .. shetar jonno ekta cash ase ..tar moto kore she rakhse .. ekhon porjonto amra
             * tar storage e kono control nei nai .. ebar amra shei control ta nibo .. ei file e boshe
             *
             * sheta hocche amra tag lagabo .. nijeder tag ..she tar tag lagacche .. amra nijeder tag lagabo
             * tailei amra identify korte parbo .. je omuk request er jonno tumi wait korba na .. shathe shathe
             * data fetch korba .. .***** ekhane apni array of tag dite paren .. multiple tag dite paren ..
             * eita kintu apnar deowa nam .. sheita abar ta ke shuru te chinay diye ashte hobe ..je vai...
             * ei ei tag amar white listed .. jekono tag tumi nite parba na ..tahole she set up er shomoy shei
             * tag gula diye niye nibe ..shei white listing ta amra korte parbo .. endpoints: er age .. amra
             * bolbo .. tagTypes...
             */
            providesTags: ["Videos"], // ekhane jehetu tag ta lagabo .. so, providesTags
            // so ami ei request ke ekta tag dilam .. jeno ta ke chinte pari .. amar way te ..tar way te na ..
            // tar hijibiji id diye na ..
            /**
             * ei je tag provide korlam na .. ekhon amar kaj hocche jokhon ami video add korbo tokhon bolbo
             * ["Videos"] ei tag owala requst jegula ase .. shegula ke invalidate kore deo ..
             */
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
         * refetch er default time hocche 1 minutes .. 😀mane hocche 1 minute er moddhe
         * previous page e gele ...fetch hobe na .. ager content e dekhabe .. kintu 1 minute pore
         * previous page e gele .. data server theke abar fetch hobe .. amra shei time control korte pari
         * 😀 keepUnusedDataFor: 600 er maddhome .. ami 5 dile .. eta 5 second porei data re-fetch korbe
         *
         */
        ////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * ekhon amra mutation niye dekhbo .. post, put, patch , delete .. jegula server e change kore
         * data send korte hoy amader ke .. egula handle kora shikhbo
         * new end point create korbo .. addVideo nam e .. and last e kintu she amake mutation er jonno
         * ekta hook diye dibe .. useAddVideoMutation.. Query gular jonno last e Query lagiye dey ..
         * ar Mutation gular jonno last e Mutation lagiye dey
         */
        addVideo: builder.mutation({
            // query : (data) => '/videos', // eta dile to amader hobe na .. ekta function .. jeta return kore ekta string .. amra etai disi .. but amader ke ekta object pathate hobe
            query: (data) => ({
                url: "/videos",
                method: "POST",
                body: data,
            }), // jokhon ei ei query ta successfull hobe .. tokhon e she dekhbe .. invalidatesTags er moddhe kichu ase kina
            invalidatesTags: ["Videos"], // mane tumi ["Videos"] tags ta ke invalidate kore deo
            /**
             * oi je tag provide korsilam na getVideos e .. ekhon amar kaj hocche jokhon ami video add korbo tokhon
             *  bolbo ["Videos"] ei tag owala requst jegula ase .. shegula ke invalidate kore deo ..
             *
             * ["Videos"] ke provide koreche ke .. getVideos().. tahole getVideos() er jei result ta .. sheta ke
             * she cash theke delete kore dibe .. jar karone new request abar re-fetch hobe ..
             */
        }),
        editVideo: builder.mutation({
            // jei video te edit button e press kortesi .. shei video tar information .. fill up obosthay ..
            // edit form e ashar kotha .. ekhon jodi edit korar page e direct keo ashe .. taile kintu information
            // gula paowa jabe na .. tai edit page e jokhon keo jabe .. tokhon link er id theke video er information
            // ene .. tarpor shekhan e fill up kore ..tarpore data update korte hobe
            query: ({ id, data }) => ({
                // jehetu duita jinish lagbe .. tai object akare niye nilam
                url: `/videos/${id}`,
                method: "PATCH", // ebar amra arekta mutation er kaj korbo .. sheta hocche edit video
                body: data,
            }),
            // ekta single video edit korle jei jei Component gular cash invalid kore dite hobe .. sheta bole dicchi
            // karon single video edit kore nam change korle .. oi notun nam er upor base kore amake related video dekhate hobe
            // abar jei information update korlam .. sheta kintu oi video er cash remove na korle tokhon e show korbe na ..
            // Home page eo updated information ta show korbe na .. karon shetao cash hoye ase .. so .. shekhaneo content re-fetch korte hobe
            invalidatesTags: (result, error, arg) => [
                "Videos",
                { type: "Video", id: arg.id },
                { type: "RelatedVideos", id: arg.id }, // eta kintu dynamic list ..ek ekta video er jonno
                // related video kintu different different ..
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
