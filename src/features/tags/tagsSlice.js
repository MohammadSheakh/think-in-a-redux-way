import { getTags } from "./tagsAPI"; // getTags nam er ekta async thunk niye ashlam 

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
/**
 * development mood e react e ... prottek jinish e duibar kore call hoy 
 */
// tags namok alada node e thakbe .. 
const initialState = {
    tags: [],
    isLoading: false,
    isError: false,
    error: "",
};

// async thunk
export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
    // convention hocche folder er nam jeita .. shetai deowa uchit 
    // "tags/fetchTags" ekhane 
    // er pore . pending / fulfilled / rejected boshiye she nije action baniye nibe ..
    // sheta dispatch korbe .. 
    const tags = await getTags();
    return tags;
});

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tags = action.payload;
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.isLoading = false;
                state.tags = [];
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export default tagsSlice.reducer;
