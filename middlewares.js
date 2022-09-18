const fetch = require("node-fetch");

// ekhane amra ekta curry pai .. curry function ... 
const delayActionMiddleware = (store) => (next) => (action) => {
    // eta jodio shomosto application er jonnoi applicable .. but amra ekta particular action
    // er jonnoi korte chai ... 
    if (action.type === "todos/todoAdded") {
        console.log("I am delaying you!");

        setTimeout(() => {
            next(action);
        }, 2000);
        // ekhane jei action niye kaj kortesi .. sheta ashle amra majh e kichu kaj kore 
        // finally return kore dite hobe .. naile ekhane atke jabe ..  next stage e jabe na 
        return;
    }

    return next(action); // onno kono action ashle she pass hoye jabe .. 
    
};

// npm i node-fetch@2 // 2 number version ta use korbo 
const fetchTodosMiddleware = (store) => (next) => async (action) => {
    if (action.type === "todos/fetchTodos") {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );

        const todos = await response.json();

        store.dispatch({
            type: "todos/todoLoaded",
            payload: todos,
        });

        console.log(
            `Number of updated todos: ${store.getState().todos.length}`
        );

        return;
    }

    return next(action);
};

module.exports = {
    delayActionMiddleware,
    fetchTodosMiddleware,
};
/**
 * node js e evabe export korte hoy ... 
 */