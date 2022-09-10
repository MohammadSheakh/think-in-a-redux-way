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
                    // onClick e function er body dite hoy .. function er call na ....
                >
                    Increment
                </button>
                <button
                    className="bg-red-400 text-white px-3 py-2 rounded shadow"
                    onClick={decrement}
                    // onClick e function er body dite hoy .. function er call na ....
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

// dispatch korar je function ta .. shetao to redux er kache ase .. shei dispatch korar function ta keo
// amra , amader component er props e niye chole ashbo ..
// dispatch er khetre amader shudhu dispatch ta lagbe ..
const mapDispatchToProps = (dispatch) => {
    // amra jei nam e props dite chai .. sheta object akare likhbo
    // dispatch ke ekta action bole dite hoy ..
    return {
        // dispatch ta jehetu amra peye jabo .. dispatch ta amader ke call korte hobe .. increment ta hocche
        // ashole dispatch function .. kintu kotha hocche  direct dispatch amra call kore dite parbo na ..
        // karon dispatch call kore dile to ekhanei action ta peye jabe .. sheta to hole hobe na ..
        // amake ekta function dite hobe .. tai amra ekta anonymous function nilam.. jeta return kore
        // dispatch function .. and dispatch function call korbo jokhon ami .. tokhon amake vitore ki dite hobe
        // ekta action ..so ami actions gula import kore niye ashbo .. counter er jonno
        // action hocche simple ekta object .. jetar type {type: } hocche something ..
        // kintu amra amader khetre action creator use korechi amra .. amra jodi action creator e amra jai
        // tahole dekhte parbo .. increament function .. she ekta value ney .. ar amader ke ekta object
        // return kore i mean action diye dey ..tahole action creator theke amra jodi function ta niye ashi

        increment: (value) => dispatch(increment(value)),
        // increament function ta ekhane ami call kore diyechi .. ki return peyechi .. ultimately ekta
        // action return peyechi.. ekta object peyechi .. jar moddhe object property ase ..
        // shei increment er moddhe to ekta value lagbe tai na .. tai ami annoynimous function er moddhe
        // value niye .. sheta ami increment function er moddhe pass kore diyechi
        decrement: (value) => dispatch(decrement(value)),

        // dispatch namok function ta ekhane kintu call hoye jay na .. dispatch function ta ekhane return kore ..
        // and dispatch function er moddhe amake action ta dite hoy ..

        // ekhon tahole ei duita jinish .. increment and decrement .. amader props e available hoye jabe ..
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
