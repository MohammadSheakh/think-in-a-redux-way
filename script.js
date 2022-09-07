// select dom elements
const counterEl = document.getElementById("counter");
const incrementEl = document.getElementById("increment");
const decrementEl = document.getElementById("decrement");

// initial state // single counter banacchi
const initialState = {
    value: 0,
};

// create reducer function // current state ar action ta parameter hishebe ney ..
function counterReducer(state = initialState, action) {
    // jodi action eita hoy .. taile evabe state change koro .. jodi action
    // arekta hoy ... taile arek vabe state change koro ..
    if (action.type === "increment") {
        return {
            // shorashori muted korbo na .. immutably change korbo .. mane copy kore
            // then update korbo .. notun ekta object return korchi
            ...state,
            value: state.value + 1,
        };
    } else if (action.type === "decrement") {
        return {
            ...state,
            value: state.value - 1,
        };
    } else {
        return state;
    }
}

// create store
const store = Redux.createStore(counterReducer); // reducer function ta pass kore dite hobe

// UI manually update korte hobe .. jehetu reactive environment na
const render = () => {
    // updated current state ta niye .. UI te update kore dibe
    const state = store.getState();
    counterEl.innerText = state.value.toString();
};

// update UI initially
render();

store.subscribe(render); // ekta function dite hobe .. jokhon e store update hobe .. tokhon e jeno
// function ta call hoy

// button click listeners
incrementEl.addEventListener("click", () => {
    // button e click korle action ekta dispatch korbo ..
    // dispatch er moddhe amake bolte hobe ... kon action ami dispatch korchi ..action er type ta bole
    // dite hobe
    store.dispatch({
        type: "increment",
    });
});

decrementEl.addEventListener("click", () => {
    // action dispatch houwa manei reducer function ta call houwa
    store.dispatch({
        type: "decrement",
    });
});
