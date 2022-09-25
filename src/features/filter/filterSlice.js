const { createSlice } = require("@reduxjs/toolkit");
/**
 * ekhane amra shudhu selection korbo .. amra ekhane
 * kono API request korbo na .. 
 * amra local reducer niyei kaj korbo .. jeta amader 
 * old jei kaj gula amra korechi .. async kaj gula 
 * amra korbo na .. tai async thunk er o proyojon 
 * hobe na .. 
 */
const initialState = {
    tags: [],
    search: "",
};

const filterSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        tagSelected: (state, action) => {
            // ekhane amake reducer function ta likhte hobe .. 
            state.tags.push(action.payload);
            // state er tags er array te push korte hobe 
            // ekhane shora shori state ke muted korte parbo 
        },
        tagRemoved: (state, action) => {
            // tags array te jodi oi tag ta theke thake
            // taile shei tag ta remove korbo 
            const indexToRemove = state.tags.indexOf(action.payload);
            // age dekhi je array te index ta ase kina ... 
            // shei index ta age ber kori .. tarpore .. 

            if (indexToRemove !== -1) {
                state.tags.splice(indexToRemove, 1);
                // splice use kore amra remove kore dite parbo
                // kon index theke remove korbo , koyta element remove korbo .. 
            }
        },
        searched: (state, action) => {
            state.search = action.payload;
        },
    },
});

export default filterSlice.reducer;
export const { tagSelected, tagRemoved, searched } = filterSlice.actions;
// action gulao dispatch korte hobe ... 