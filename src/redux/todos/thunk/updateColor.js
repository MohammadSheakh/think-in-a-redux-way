import { colorSelected } from "../actions";

const updateColor = (todoId, color) => {
    // kon todo , kon color sheta lagbe ..
    return async (dispatch) => {
        const response = await fetch(`http://localhost:9000/todos/${todoId}`, {
            method: "PATCH",
            body: JSON.stringify({
                color: color,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const todo = await response.json(); // updated ..server theke jeta ashse .. sheta

        dispatch(colorSelected(todo.id, todo.color));
    };
};

export default updateColor;
