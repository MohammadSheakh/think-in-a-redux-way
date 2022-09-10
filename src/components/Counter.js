import { connect } from "react-redux"; // react er shathe redux er binding ..
import { decrement, increment } from "../redux/counter/actions";

function Counter({ count, increment, decrement }) {
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

// eta hobe ekta function.. state ke prop e convert korbo, tar mane ei function ke definitely state petei
// hobe .. tar pore na hoy she prop e convert korbe ..
const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    // amra jani props kintu ekta object hoy .. taile amader ekta object return korte hobe .. shei object
    // tai hobe tar props ..tar ownProps o thakte pare.. sheta niye amra pore kotha boltesi
    return {
        // props er icchamoto nam dite paren .. ami nam dilam count.. amader state er kon jinish er moddhe
        // ase ? reducer e gele dekhte parbo .. initial state e .. value nam e rekhechilam
        //🎯 ei object er moddhe apni ja diben .. shegula Main Component e props akare access kora jabe
        count: state.value,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        increment: (value) => dispatch(increment(value)),
        decrement: (value) => dispatch(decrement(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

/**
 * connect function ta hocche ekta higher order function. connect function ta ke call
 * korle .. ei jinish ta return kore ashole higher order component.
 *
 * const NewComponent = HOC(OriginalComponent)
 *
 * connect() () .. er mane hocche connect function ta call korle amra higher order function pabo
 *
 * connect () ei tuku hocche call .. eita call korle ami higher order function ta pelam
 * tarpor connect ()() .. tar parameter hishebe ekta Component dite hoy .. shei Component ta hocche ,
 * jei Component ta amar ei page e ase ..
 *
 * amra ashole Main Component ta ke export na kore Higher order Component ta ke export korbo
 *
 * ekhon ei connect() er moddhe .. jokhon amra connect ta ke call korbo Higher order component paowar jonno
 * tokhon er duita parameter proyojon hoy..ekta hocche mapStateToProps , arekta hocche mapDispatchToProps
 *
 *
 *  mapStateToProps => state ke prop e convert kore dey .. map kore dey
 *  mapDispatchToProps => Dispatch jei function ta ase .. redux er core .. shetakeo ashole props e convert
 *  kore dey
 *
 * ei duita amader likhte hobe .. jeta ashole amader help korbe .. ei Component er parameter hishebe
 * ei state gulo ke pete
 *
 */
