import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    changeTransaction,
    createTransaction,
} from "../features/transaction/transactionSlice";

export default function Form() {
    // form er data amake locally handle korte hobe .. state manage korte hobe .. 
    // useState use korbo amra ejonno .. 
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [editMode, setEditMode] = useState(false); // edit korbo ki korbo na ... 
    // eta select korar jonno amra ekta state nicchi ... 

    const dispatch = useDispatch();
    const { isLoading, isError } = useSelector((state) => state.transaction);
    const { editing } = useSelector((state) => state.transaction) || {};

    // listen for edit mode active
    useEffect(() => {
        const { id, name, amount, type } = editing || {};
        if (id) {
            // id thakle amra edit mode true korbo .. otherwise false korbo .. 
            setEditMode(true);
            setName(name);
            setType(type);
            setAmount(amount);
        } else {
            setEditMode(false);
            reset();
        }
    }, [editing]);

    // reset mane form er value "" hoye jaowa ... 
    const reset = () => {
        setName("");
        setType("");
        setAmount("");
    };

    const handleCreate = (e) => {
        // form submit korle .. ei function kaj korbe .. 
        e.preventDefault();// page jeno reload na ney .. ejonno ei ta .. 
        // amader ke ekta thunk function dispatch korte hoy ... er moddhe ekta object 
        // pass kora jay .. jetar modde ami name, type, amount bole dite pari .. 
        // amount ta Number() er moddhe pass korte hobe .. jeno calculation kora jay 
        dispatch(
            createTransaction({
                name,
                type,
                amount: Number(amount),
            })
        );
        reset(); // form er data gula reset kore dite hobe .. 
    };

    const handleUpdate = (e) => {
        //update button e click korle ekta event fire hoy ... 
        e.preventDefault(); // jeno page reload na ney 
        // amra ekta thunk function dispatch kori .. 
        dispatch(
            // jehtu update er bepar ... tai amader ekta id lagbe .. kon transaction 
            // update korbo sheta track rakhar jonno .. 
            changeTransaction({
                // ekhaneo amader ke ekta object bole dite hoy ... er moddhe amra 
                // value pass korbo .. 
                id: editing?.id,
                data: {
                    name: name,
                    amount: amount,
                    type: type,
                },
            })
        );
        setEditMode(false); // edit kora hoye gele .. setEditMode() false kore dite hobe .. 
        reset(); // form o reset kore dite hobe ..  .
    };

    // edit mode cancel korte chaile  . 
    const cancelEditMode = () => {
        reset();
        setEditMode(false);
    };

    return (
        <div className="form">
            <h3>Add new transaction</h3>

            {/* edit mode er upor base kore kon function kaj korabo .. sheta depend korbe .  */}
            <form onSubmit={editMode ? handleUpdate : handleCreate}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="enter title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group radio">
                    <label>Type</label>
                    <div className="radio_group">
                        <input
                            required
                            type="radio"
                            value="income"
                            name="type"
                            checked={type === "income"}
                            onChange={(e) => setType("income")}
                        />
                        <label>Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            placeholder="Expense"
                            checked={type === "expense"}
                            onChange={(e) => setType("expense")}
                        />
                        <label>Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        required
                        placeholder="enter amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button disabled={isLoading} className="btn" type="submit">
                    {editMode ? "Update Transaction" : "Add Transaction"}
                </button>

                {!isLoading && isError && (
                    <p className="error">There was an error occured</p>
                )}
            </form>

            {editMode && (
                <button className="btn cancel_edit" onClick={cancelEditMode}>
                    Cancel Edit
                </button>
            )}
        </div>
    );
}
