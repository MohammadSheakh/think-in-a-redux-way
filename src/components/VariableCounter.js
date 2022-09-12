// 2.8
import { connect } from "react-redux";
import { decrement, increment } from "../redux/counter/actions";
import {
    decrement as dynamicDecrement,
    increment as dynamicIncrement,
} from "../redux/dynamicCounter/actions"; // rename
// dui jayga thekei amader action gula ke niye ashte hobe

function VariableCounter({ count, increment, decrement }) {
    return (
        <div className="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
            <div className="text-2xl font-semibold">{count}</div>
            <div className="flex space-x-3">
                <button
                    className="bg-indigo-400 text-white px-3 py-2 rounded shadow"
                    onClick={increment}
                >
                    Increment
                </button>
                <button
                    className="bg-red-400 text-white px-3 py-2 rounded shadow"
                    onClick={decrement}
                >
                    Decrement
                </button>
            </div>
        </div>
    );
}

// ekhane amader main change ta hobe // state ta jehetu dui vag e vag hoye gese .. tai
// state.value er moddhe kintu amra ar jinish ta pabo na ..
const mapStateToProps = (state, ownProps) => {
    // ownProps e dynamic er value jodi true thake .. taile ekta return korbo naile
    // arekta return korbo .. object return korte hoy arki
    return {
        count: ownProps.dynamic
            ? state.dynamicCounter.value
            : state.counter.value,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        increment: ownProps.dynamic
            ? (value) => dispatch(dynamicIncrement(5))
            : () => dispatch(increment()),
        decrement: ownProps.dynamic
            ? (value) => dispatch(dynamicDecrement(2))
            : () => dispatch(decrement()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VariableCounter);
