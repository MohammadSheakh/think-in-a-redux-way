const store = require("./app/store");
const { counterActions } = require("./features/counter/counterSlice");
const {
    dynamicCounterActions,
} = require("./features/dynamicCounter/dynamicCounterSlice");
const { fetchPosts } = require("./features/post/postSlice");
// named export jehetu korechilam .. tai {}  er moddhe nite hobe

// initial state
// console.log(`Initial State: ${JSON.stringify(store.getState())}`);

// subscribe to state changes
store.subscribe(() => {
    // console.log(store.getState());
});

// disptach actions
store.dispatch(fetchPosts()); // thunk function ke dispatch korbo .. old way of
// redux .. thunk function ta ke niye ashte hobe
