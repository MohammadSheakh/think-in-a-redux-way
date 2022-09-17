const { createStore, applyMiddleware } = require("redux");
const {
    delayActionMiddleware,
    fetchTodosMiddleware,
} = require("./middlewares");

// import js ekhane kaj korbe na .. amader ke common js .. require syntax e niye ashte hobe

// initial state
const initialState = {
    // simple ekta object .. tar moddhe todos er ekta array thakbe
    todos: [],
};

// reducer
const todoReducer = (state = initialState, action) => {
    // amra jani reducer state ar action ney
    switch (action.type) {
        case "todos/todoAdded":
            // definately amar action.payload er moddhe kichu ekta thakbe ..she onujayi
            // state ta ke amar update kore dite hobe
            return {
                // new object return korchi ... ja ase .. sheta ke age copy kore niye ashsi
                ...state,
                todos: [
                    // tar por todos er moddhe .. jehetu eta ekta array .. amake abar
                    // eta keo evabe copy kore niye ashte hobe
                    ...state.todos,
                    // amar new jei jinish ta .. ami array of object chinta korchi ..
                    {
                        // shekhan e amar title nam e ekta property ase .. shekhan e payload ta diye dilam
                        title: action.payload,
                    },
                ],
            };

        case "todos/todoLoaded":
            // kono ekta fake server e ekta request pathabo .. shei server  theke amra
            // kichu todo pabo ..shei todo gula ultimately amar todos er moddhe insert kore dibo
            return {
                ...state,
                todos: [
                    // eta jehetu ekta array .. so, er moddhe amar already jeta ase ..
                    // sheta ke copy kore niye ashte hobe .. action.payload er moddhe amar
                    // jei new todos gula ashbe .. sheta keo ami spread kore  nilam
                    ...state.todos,
                    ...action.payload,
                ],
            };

        default:
            break;
    }
};

// store // store er moddhe amader ke reducer bole dite hoy .. and middleware o bole deowa jay
const store = createStore(
    todoReducer,
    applyMiddleware(delayActionMiddleware, fetchTodosMiddleware)
);

// subscribe to state changes // reactive environment na thakle subscribe ta manually korte hobe
store.subscribe(() => {
    console.log(store.getState());
});

// disptach actions
// store.dispatch({
//     type: "todos/todoAdded",
//     payload: "Learn Redux from LWS",
// });

store.dispatch({
    type: "todos/fetchTodos",
});
