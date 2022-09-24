import { getVideos } from "./videosAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

/**
 * amader home page e jei video list ta ashbe .. sheta kintu server theke ashbe ..
 * so , ei ta amader ekta feature ..tar mane videos amader ekta feature ..
 * ekhane ami amar slice ta banabo
 */

const initialState = {
    videos: [], // eita ekta blank array .. jetar moddhe videos gula ashbe
    isLoading: false,
    isError: false,
    error: "",
};

// async thunk function ta to export korechi e .. sheta ami UI te dispatch korbo pore

// addCase er moddhe ki lagbe amar .. amar jei thunk function ta...
// sheta age banate hobe amake ..shei thunk function bananor jonno
// amake createAsyncThunk nam er ekta function tara amake diye diyeche
// async thunk
export const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
    // ei ta amader onno jaygay o lagbe
    // "videos/fetchVideos" eita amader ke bole dite hobe .. karon eitar upor
    // base korei she action er nam create korbe .. like tar action er nam hobe
    // "videos/fetchVideos/fulfilled" or "videos/fetchVideos/rejected"
    // or "videos/fetchVideos/pending"

    // 2nd parameter e amake async function ta bole dite hoy .. jeta amar action
    // creator ta actually..
    const videos = await getVideos(); // er moddhe amake server theke data niye ashte hobe
    // convention hocche pura server theke data anar bepar ta .. onno file e rakhai valo
    // mane actual API gula ke amra separate file e rakhbo .. amra chaile ekhaneo fetch
    // call kore niye ashte pari

    // getVideos() function ta ultimately ekta promise return kore .. shetai amar
    // ekhane dorkar hobe ..
    return videos;
});
/**
 * amader ei feature tar kaj hocche server theke data ana shudhu .. server theke
 * data ere .. state e sheta ke vore deowa ..ei kaj ta kintu async thunk er kaj ..
 * ei dhoroner kaj er jonno amar ekhane reducer er kintu proyojon nai .. ei dhoroner
 * kaj gula amake extraReducers er maddome handle korte hoy ..
 */

//ekhon amar kaj hocche slice create kora .. ekta object dite hoy
const videoSlice = createSlice({
    name: "videos", // slice er ekta nam dite hoy
    initialState, // initialState ta bole dite hoy
    extraReducers: (builder) => {
        // jehetu fetching er bepar .. ora amader ke 3 ta method diye dise
        // shegula extraReducers er moddhe call korte hobe
        builder
            .addCase(fetchVideos.pending, (state) => {
                // addCase er moddhe ki lagbe amar .. amar jei thunk function ta...
                // sheta age banate hobe amake ..shei thunk function bananor jonno
                // amake createAsyncThunk nam er ekta function tara amake diye diyeche

                // promise er 3 ta state .. pending .. fulfilled, rejected
                // 2nd parameter e reducer function ta bole dite hoy ... she state ar action receive kore

                state.isError = false; // ager state e kono error thakle .. sheta ke clear kore nilam
                state.isLoading = true;
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.videos = action.payload;
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.isLoading = false;
                state.videos = [];
                state.isError = true;
                state.error = action.error?.message; // error er message property er moddhe error ta thake
            });
    },
});

export default videoSlice.reducer;
// jehetu action amra nijera kono dispatch korbo na .. tai reducer ta keo shudhu
// export kore dile hoye jabe ..

// async thunk function ta to export korechi e .. sheta ami UI te dispatch korbo pore

/**
 * reducer jehetu ekhan theke export kore diyechi .. ekhon tahole ..App e gia .. amader jei
 * main store ta ase .. shekhan e reducer ta add kore dite hobe
 */
