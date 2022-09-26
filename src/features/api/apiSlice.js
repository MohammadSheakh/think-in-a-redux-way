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
     * function .. erokom dey .. ekhane builder pattern follow korte hobe ... builder ta ultim
     */
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => "/videos",
            keepUnusedDataFor: 600,
            providesTags: ["Videos"],
        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
            providesTags: (result, error, arg) => [{ type: "Video", id: arg }],
        }),
        getRelatedVideos: builder.query({
            query: ({ id, title }) => {
                const tags = title.split(" ");
                const likes = tags.map((tag) => `title_like=${tag}`);
                const queryString = `/videos?${likes.join("&")}&_limit=4`;
                return queryString;
            },
            providesTags: (result, error, arg) => [
                { type: "RelatedVideos", id: arg.id },
            ],
        }),
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
