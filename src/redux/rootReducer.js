import { combineReducers } from "redux";
import filterReducer from "./filters/reducer";
import todoReducer from "./todos/reducer";

const rootReducer = combineReducers({
    todos: todoReducer, // state.todos dile jinish ta access korte parbo amra
    filters: filterReducer, // state.filters dile jinish ta access korte parbo amra
});

export default rootReducer;
