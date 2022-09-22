// eta amader initial primary file .. eta amra run korbo .. node js diye
const store = require("./app/store"); // store niye ashlam ..
// eknhane kono action niye ashte hobe na
const { counterActions } = require("./features/counter/counterSlice");
// amra slice theke counterActions ta export korechilam // named export hishebe ashsilo
// jehetu counterActions nam e pathiyechilam

// initial state // update korar age initial state .. getState call korechi
console.log(`Initial State: ${JSON.stringify(store.getState())}`);
// object hishebe jeno na print hoy .. ejonno stringify kore nilam

// subscribe to state changes // state e subscribe korlam
store.subscribe(() => {
    console.log(store.getState());
});

// disptach actions
store.dispatch(counterActions.increment());

store.dispatch(counterActions.increment());

store.dispatch(counterActions.decrement());

// run korar jonno node rtk/index.js
