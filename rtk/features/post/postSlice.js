// createSlice method amader lagbe
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

/**
 * redux toolkit e kivabe asynchronous kaj kora jay .. sheta niye kotha bolbo ..
 * amader ke continuously server er shathe communicate korte hobe ..
 * asynchronously thunk handle kora ta .. onek important.. karon actually amra
 * amader project e redux tool kit e use korbo ..
 * -------------------------------------------------------------
 * amra post nam er ekta feature create korbo ..amra slice banai ..
 */

// initial state
const initialState = {
    loading: false,
    posts: [],
    error: "",
};

/**
 * asynchronous thunk function ta kivabe ekhane banabo ..thunk function ta chaile
 * amra normally onno file e likhi .. but ami dekhanor jonno ei file ei rakhsi ..
 * amra chaile onno file e likhe import kore niye ashte pari ..
 * ..................................................
 * asynchronous thunk function bananor jonno tara amake createAsyncThunk nam
 * e ekta function diye diyeche .. ekhon eita ami slice er baire banabo
 * fetchposts = hobe .. shorashori amra kono function likhbo na .. amra
 * createAsyncThunk er help nibo ..  ei thunk function ta jeta korbe .. first
 * parameter e she ekta action er nam bolbe .. karon amra jei async thunk gula
 * amra banai .. shegula ashole ekta action dispatch kore ..  shei action tar
 * nam (jekono) bolte hobe amake .. --- 2nd parameter e amake bolte hobe ekta
 * callback function... amader asychronous logic ta amader ke ekhane dite hobe
 * amra shudhu try er vitor er jinish ta niye ashbo .. catch er ta nibo na ..
 * error handling ta amra ekhane korbo e na ..taholei bujha jabe je redux toolkit
 * amader ke koto help korse ..
 */

// create async thunk // pending to onekei dite pare ,.. onnano thuk function
// o dite pare .. ejonno amra ekhane ekta prefix diyechi .. "post/fetchPosts"
// er pore jinish ta dynamically action banabe .. "post/fetchPosts/pending"
// "post/fetchPosts/fullfilled" othoba "post/fetchPosts/rejected"
const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
    const response = await fetch(
        "https://jsonplaceholder.typicodes.com/posts?_limit=5"
    );
    const posts = await response.json();

    return posts; // actual data ta .. promise ta return kore dilam
    // ei promise ta peye gele .. she ei promise tar 3 ta action ..nijei she
    // dispatch kore dibe .. ekta hocche promise.fulfilled,  promise.rejected,
    // arekta hocche promise.pending.. er age amader ke ei kaj gula manually kora
    // lagto
    /**
     * egula ke bola hoy life cycle event er moto .. amader ke shudhu listen
     * korte hobe shudhu , amader reducer e .. ei jinish gula ..
     */
});

// amader ke slice banate hoy ...
const postSlice = createSlice({
    // ekta object nite hoy .. tar moddhe slice er ekta  nam dite hoy
    name: "post",
    initialState, // initial state ta bole dite hoy
    // eta kintu amar nijossho actions na ..eta automatically generated actions ..
    // so ei slice er ontorvukto jinish noy eta ..eta automatically fire korbe ..
    // eta amra reducers er moddhe dile pabo na .. amader ke extraReducers use korte
    // hobe ..
    extraReducers: (builder) => {
        // ekhane amra ekta builder pai .. tar addCase nam e ekta method ase ..
        // tar first parameter e .. action bole dite hoy .. 2nd parameter e
        // reducer function bole dite hoy .. // reducer function .. state ar
        // action receive kore .. state er bivinno property manupulate korbo
        // amra ekhane.. state ke muted korte parbo
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.posts = action.payload; // action.payload er moddhe she automatically diye dibe
        });

        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; // eita she diye dicche
            state.posts = [];
        });
    },
});

module.exports = postSlice.reducer;
module.exports.fetchPosts = fetchPosts; // named export hishebe pathiye dilam

/**
 * amake try catch diye error manually handle korte hoy nai
 *
 */
