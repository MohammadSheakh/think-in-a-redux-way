const { createStore } = require("redux");
const { produce } = require("immer"); //

const initialState = {
    name: "Learn with Sumit",
    address: {
        street: "Gulshan",
        city: "Dhaka",
        country: "Bangladesh",
    },
};

// action creator
const updateStreet = (street) => {
    return {
        type: "street_updated",
        payload: street,
    };
};

// reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "street_updated":
            // return {
            //     ...state,
            //     address: {
            // address property ta jehetu nije ekta object .. eta kintu immutably hobe na
            //         ...state.address,
            //         street: action.payload, // jeta change hobe .. sheta ke change kore dilam
            //     },
            // };
            return produce(state, (draftState) => {
                // produce function er call return kore dibo // 2nd parameter e she ekta callback expect
                // kore //  vai ami tomake shora shori state dilam na .. tumi draft state ta iccha moto
                // muted koro...
                draftState.address.street = action.payload; // shora shori muted kore dilam
            });

        default:
            return state;
    }
};

const store = createStore(reducer);

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(updateStreet("Banani"));
