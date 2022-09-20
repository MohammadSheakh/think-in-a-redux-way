import { toggled } from "../actions"; // jei action ta dispatch korte hobe .. sheta niye ashlam
// thunk function likhbo ekhane ..
const updateStatus = (todoId, currentStatus) => {
    // anonymous function nilam ..jeno action creator e jehetu todoId pathate hobe ..
    // sheta jeno receive korte pari .. karon kon todo update korbo .. eta janar jonno id lagbe
    // currentStatus tao lagbe .. update kore deowar jonno
    return async (dispatch) => {
        const response = await fetch(`http://localhost:9000/todos/${todoId}`, {
            method: "PATCH", // update er jonno method hocche PATCH
            body: JSON.stringify({
                completed: !currentStatus, // current jei status ase .. sheta ke change kore dilam
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const todo = await response.json(); // updated jinish peye gelam .. ekhon eta
        // ke todo te niye ... dispatch kore dilam... jodio bujhi nai ei jinish ta ..
        // ektu confusion .. update to hoyei gelo .. eta abar ken dispatch kora lagbe

        dispatch(toggled(todo.id));
    };
};

export default updateStatus;

// thunk function banano shesh .. ekhon amar ar action er kono change kora lagbe na ..
// ekhon amar shudhu calling ta change kora lagbe .. calling ta ase .. kono ekta
// particular todo list er moddhe arki i mean component e kaj korte hobe
