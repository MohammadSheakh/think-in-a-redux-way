import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./rootReducer";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware)) // ekhane ar dot default bola lagbe na .. 
);

export default store;

// store e kono middleware chilo na .. middleware ta dhuka te hobe ekhon 
// amader .. jehetu thunk function ta likha hoyeche amader ... 

/**
 * amra thunk middleware diye amra jekono .. thunk function handle korar
 * jonno ready .. eta ki korbe .. jokhon e erokom kono thunk pabe ... 
 * thunk er vitor e jei dispatch ase .. she ki korbe .. oi thunk ta ke 
 * at ke dibe .. tar por setake handle korbe .. thunk function .. tar moto
 * kaj shesh korar pore .. action dispatch korbe ... 
 * 
 * thunk middle ware ei pura jinish ta handle korbe .. and amader jei 
 * thunk gula call hobe ... eder moddhe dispatch and getState vore dite
 * parbe ..  ekhon amader last kaj hocche amra jei thunk function baniyechi
 * sheta call kora .. sheta kothay call korbo amra ? 
 * 
 * amra jani api call korar jonno ba side effect handle korar jonno 
 * useEffect call korte hoy ...Component er moddhe .. 
 * 
 * 
 * 
 * 
 * 
 */