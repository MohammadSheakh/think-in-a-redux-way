const fetch = require("node-fetch"); // npm i node-fetch@2
const { createStore, applyMiddleware } = require("redux");
const thunkMiddleware = require("redux-thunk"); // npm i redux-thunk

// old way of redux .. fetching data

// initial state
const initialState = {
    loading: false,
    posts: [],
    error: "",
};
// amader kichu action likhte hobe .. action creator likhe felchi ..
const fetchPostsRequested = () => {
    return {
        type: "posts/requested",
    };
};

const fetchPostsSucceeded = (posts) => {
    return {
        type: "posts/succeeded",
        payload: posts,
    };
};

const fetchPostsFailed = (error) => {
    return {
        type: "posts/failed",
        payload: error,
    };
};

// reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "posts/requested":
            return {
                ...state,
                loading: true,
                error: "",
            };

        case "posts/succeeded":
            return {
                ...state,
                loading: false,
                error: "",
                posts: action.payload,
            };

        case "posts/failed":
            return {
                ...state,
                loading: false,
                error: action.payload.message,
                posts: [],
            };

        default:
            break;
    }
};

// thunk function
const fetchPosts = () => {
    return async (dispatch) => {
        // getState dorkar hoile .. shetao amra nibo
        dispatch(fetchPostsRequested()); // loading ta true korar jonno ekta action
        // dispatch kore nite hobe ..
        // jehetu asynchronous request pathabo ..

        try {
            // jehetu async await .. tai amake try catch block use korte hobe
            const response = await fetch(
                "https://jsonplaceholder.typicodes.com/posts?_limit=5"
            );
            const posts = await response.json(); // string ke json e convert korlam
            dispatch(fetchPostsSucceeded(posts)); // Succeeded action ta dispatch
            // korbo
        } catch (err) {
            dispatch(fetchPostsFailed(err)); // failed action ta dispatch korbo
        }
    };
};

// create store
const store = createStore(reducer, applyMiddleware(thunkMiddleware.default));
// jehetu node.js environment .. tai dot default bole deowa lagse

// subscribe to state changes
store.subscribe(() => {
    // jeno ami state change gula dekhte pari
    console.log(store.getState());
});

// dispatch action
store.dispatch(fetchPosts()); // ekhane amra thunk function ta bole dibo ..
