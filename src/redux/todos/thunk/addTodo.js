import { added } from "../actions";

// thunk function ..
const addTodo = (todoText) => {
    return async (dispatch) => {
        // thunk function shob shomoy dispatch receive kore and getState receive kore ..
        // amra jani ekhane post request pathate hobe ... ami jehetu save korte chai ..
        // amra jani fetch e .. 2nd parameter e option deowa jay ..
        const response = await fetch("http://localhost:9000/todos", {
            method: "POST",
            // jehetu amake data pathate hobe .. so, amake body nite hobe ..
            body: JSON.stringify({
                // and amake obosshoi stringify kore nite hobe .. jehetu json data ..
                text: todoText, // amra jani todo er moddhe text nam er ekta jinish dite hoy..
                // jeta ami parameter e peyechi..
                completed: false, // ei property ta by default false kore rakhlam ..
            }),
            // echara amake ekta headers pathate hobe .. jehetu eta post request ..
            // amake ekta content type pathate hobe ..charset=UTF-8 bole dibo .. ete
            // unicode text holeo...  bangla text holeo kaj korbe ..
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const todo = await response.json();

        dispatch(added(todo.text)); // action ta dispatch kore dilam ..
    };
};

export default addTodo;

/**
 * amra action er moddhe todo er text ta pathiye dei .. ager bar kintu thunk function er
 * parameter e amader kichu pathanor dorkar chilo na .. just server theke todo ene
 * amader dekhato .. ekhon kintu todo add korar shomoy amader ekta input ase .. shei jinish
 * ta kintu amader thunk function er moddhe pathate hobe ..kivabe ami thunk function er
 * moddhe jeta input e add kora hoyeche .. sheta pabo .. ejonno amra javascript er pattern
 * follow korbo.. amra jeta korbo .. thunk function ke amra ekta anonymous function diye
 * wrap kore dibo .. mane simple bepar .. addTodo chilo .. shora shori amar thunk function
 * ta .. sheita ke na kore addTodo ke ekta alada function nicchi .. jeita return kore \
 * thunk function ta .. eita korar karone jei shubidha holo .. sheta hocche .. ei khane
 * ami ekhon parameter receive korte parbo ..
 */

// thunk function er bepar ta hoye gelo .. ei ta automatically handle hobe ..
// kintu kotha hocche eta call er bepar ta ..
// Component e jai .. kothay call hoyechilo .. amader header er moddhe ..
