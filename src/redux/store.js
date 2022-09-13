import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import myLogger from "./middlewares/myLogger";
import rootReducer from "./rootReducer";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger, myLogger))
    // wrap kore dilam ..composeWithDevTools er moddhe
);

export default store;

// dev tools extension shudhu bebohar korlei hobe na .. code eo bole dite hobe ..
// dev tools ami chai naki chai na .. npm i redux-devtools-extension
