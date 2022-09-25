import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addTransaction,
    deleteTransaction,
    editTransaction,
    getTransactions,
} from "./transactionAPI"; // api gula niye ashlam

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: "",
    editing: {}, // jei information ta amra edit korte chai .. sheta ke ekhane rekhe dibo
};

// ek ekta API handle korar jonno ek ekta thunk function
// dispatch korar shomoy ei thunk function gula UI te
// lagbe .. tai amra export kore dibo ekhan thekei
// egulai amar ek ekta action creator ...
// convention hocche folder er nam diye shuru korte hoy
// er pore async function tar nam dite hoy ...
// er pore toolkit automatically / dynamically
// reducer function er nam er upor base kore
// action er nam thik kore dey .. logger e amra sheta
// dekhte pari ..
// async thunks
export const fetchTransactions = createAsyncThunk(
    "transaction/fetchTransactions",
    async () => {
        const transactions = await getTransactions();
        return transactions;
    }
);

// ei thunk function ta ke jokhon dispatch korbo ..
// tokhon UI theke data diye dibo ... karon
// addTransaction API data expect kore ..
export const createTransaction = createAsyncThunk(
    "transaction/createTransaction",
    async (data) => {
        const transaction = await addTransaction(data);
        return transaction;
    }
);

// object akare keno
// amra jani jokhon amra action dispatch korbo .. tokhon
// parameter e kintu ektai parameter pathate pari ..
// tai na .. jar karone amake object akare pathate hobe ..
// tar id property er modde id diye dibo .. data property
// er moddhe data diye dibo ..
export const changeTransaction = createAsyncThunk(
    "transaction/changeTransaction",
    async ({ id, data }) => {
        const transaction = await editTransaction(id, data);
        return transaction;
    }
);

export const removeTransaction = createAsyncThunk(
    "transaction/removeTransaction",
    async (id) => {
        const transaction = await deleteTransaction(id);
        return transaction;
    }
);

// thunk gula banano shesh .. ebar ami amar slice ta
// banate pari ..
// create slice
const transactionSlice = createSlice({
    name: "transaction", // nam dite hoy
    initialState,
    reducers: {
        // edit korte chaile editing {} er moddhe data assign hoye jabe ..
        editActive: (state, action) => {
            state.editing = action.payload; // full transaction er payload tai diye dibo
        },
        editInActive: (state) => {
            state.editing = {};
        },
    },
    // API jehetu call korbo extraReducer call
    // kora lagbe .. call back function ..
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                // eita hocche amar reducer function ...
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
                state.transactions = [];
            })
            .addCase(createTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions.push(action.payload); // shora shori muted
                // korte pari amra ...
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
                // state.transactions = []; ei ta bola lagbe na ...
            })
            .addCase(changeTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(changeTransaction.fulfilled, (state, action) => {
                // edit  jodi fulfilled hoy ...
                state.isError = false;
                state.isLoading = false;
                /**
                 * particular jinish ta ke khuje ber kore .. oi jinish ta ke update
                 * kore dite hobe ... server e ekta jinish change hoyeche .. change
                 * houar pore .. ami kintu updated jinis ta peyechi..and amar action
                 * jeta ase .. shei action er moddhe kintu amar .. action.payload
                 * er moddhe kintu amar updated jinish ta diye dibe .. so, amar jeta
                 * kora lagbe .. oi id owala jinish ta amar local state e khuje ber
                 * kore , tar pore sheta ke update korte hobe ..
                 */
                /**
                 * index ta age khuje ber kori .. je .. kon id ta age amader ke
                 * khuje ber korte hobe ..
                 * prottek bar ekta kroe transaction pabo .. jei transaction er id
                 * er shathe action.payload er id mile jabe ... sheta ke update
                 * korbo
                 */
                const indexToUpdate = state.transactions.findIndex(
                    (t) => t.id === action.payload.id
                );

                state.transactions[indexToUpdate] = action.payload;
            })
            .addCase(changeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(removeTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                console.log(action);
                state.isError = false;
                state.isLoading = false;
                // delete er khetre amader ke filter method use korte hoy ..
                state.transactions = state.transactions.filter(
                    // (t) => t.id !== action.payload // amar expectation chilo.. action.payload er moddhe id ta pabo .. jeta back end theke ashbe
                    (t) => t.id !== action.meta.arg // ami jei argument ta ta ke diyechilam .. shetai she meta er moddhe rekhe diyeche
                    // jei jei jinish gula milbe na .. shegula ke rakhbo ..
                );
                // muted kore felechi .. so, amar delete hoye jaowar kotha ..
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export default transactionSlice.reducer; // reducer ta ke default export kore dite hobe
export const { editActive, editInActive } = transactionSlice.actions;
