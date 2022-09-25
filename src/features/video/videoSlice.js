import { getVideo } from "./videoAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    video: {}, // single video jehetu .. blank array hobe na .. blank object hobe 
    // jeno amra destructure e error na khai kokhono .. 
    // ekta blank object minimum thakbei arki 
    isLoading: false,
    isError: false,
    error: "",
};

/**
 * jokhon ami component theke thunk function dispatch korbo .. tokhon amake id ta pathate hobe 
 * react router dom ke request kore id ta nite hobe ... 
 */
// async thunk
export const fetchVideo = createAsyncThunk("video/fetchVideo", async (id) => {
    const video = await getVideo(id);
    return video;
});

const videoSlice = createSlice({
    name: "video",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideo.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.video = action.payload;
            })
            .addCase(fetchVideo.rejected, (state, action) => {
                state.isLoading = false;
                state.video = {}; // ekhane blank object hobe .. 
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export default videoSlice.reducer;
