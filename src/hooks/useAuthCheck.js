import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

// ami ekta custom hook banacchi // use diye start korte hoy .. React er hook
export default function useAuthCheck() {
    // ekhane amar kaj hocche localStorage e amar jinish ase kina .. sheta check kora ..
    // jodi thake .. taile ami true return korbo .. na thakle false return korbo ..

    // local storage theke amar kaj ta kora lagbe .. localStorage kintu browser er ekta jinish .. eta kintu
    // ekta side effect ..eta kintu react er kaj na .. taile ei kaj ta amake korte hobe useEffect er moddhe
    //
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        // useEffect er moddhe ekta callback function dite hoy .. sheta ami dicchi ..
        // ei khan e ami sure je amar local storage available .. karon tokhon amar .. ekbar component ta
        // load hoye gese .. browser active hoye gese .. browser er client side e shob kichu active ..
        // tokhon useEffect e first callback er moddhe localStorage ke access korte parbo ..

        // localStorage window object er moddhe thake .. useEffect use na korle kintu amra first ei
        // prothom bar ei kintu amra window object pabo na ..
        const localAuth = localStorage?.getItem("auth"); // amra auth property er moddhe rekhechilam

        if (localAuth) {
            const auth = JSON.parse(localAuth); // local auth er moddhe kintu string hishebe ase ...
            // key value hishebe ase .. ekhan theke jodi ami actual AUTH object ta pete chai ..
            // taile amake JSON.parse korte hobe .. JSON.Stringify er ulta ta.. ekta string ke JSON e
            // parse kora .. tahole eita ekta valid javascript object hoye jabe ..
            if (auth?.accessToken && auth?.user) {
                // tar mane ami logged in asi .. amar local storage e jinish ase ..
                // jodi ekhane duita object e theke thake .. mane jeno eita undefined na hoy ..
                // taile slice er action dispatch korbo ..
                dispatch(
                    userLoggedIn({
                        accessToken: auth.accessToken,
                        user: auth.user,
                    })
                );
            }
        }
        setAuthChecked(true);
    }, [dispatch, setAuthChecked]);

    return authChecked;
}

/**
 * amar ei hook tar kaj hocche simple ekta checking kora .. jokhon page ta load hobe .. ami jodi logged in thaki
 * and amar local storage e jodi token thake.. and user thake.. tahole ami amar redux store ta update kore felbo ..
 * finally setAuthChecked(true); er maddhome ami janiye diyechi je ..hae amar kaj shesh .. ebar tumi tomar routing
 * enabled korte paro ..App.js e .. tahole ei hook ta return kore kintu true ba false .. mane ei hook ta shuru te
 * false diye shuru hoy .. and finally check kore localStorage update kore true return korbe ..
 */
