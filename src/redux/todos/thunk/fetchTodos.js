import { loaded } from "../actions";

const fetchTodos = async (dispatch) => {
    // jei fetch request ta pathiyechi .. sheta hocche get request ..
    const response = await fetch("http://localhost:9000/todos");
    const todos = await response.json();

    dispatch(loaded(todos));
};

export default fetchTodos;
