import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
    const isLoggedIn = useAuth();

    return isLoggedIn ? children : <Navigate to="/" />; // logged in thakle children er kase jete dibo
}

/**
 * jodi user logged in thake .. taile Private Route diye jake Wrap kore diyecho .. take jete
 * diba .. ar jodi user Logged in na thake .. taile ta ke onno ekta page e redirect kore diba
 * Login Page e ..
 *
 * tar mane PrivateRoute er peter moddhe ba Children hishebe jeta ase .. shekhan e jete dibo
 * ki dibo na .. sheta niye kaj korbo ..
 */

/**
 * Logged in Thaka ba na thakar bepar ta kintu amader redux store e ase ..
 * sheta ami ekhaneo UseSelector diye nite pari .. kintu sheta jeno re-useable hoy .. shetar  jonno
 * amra ekta hook baniye nicchi ..
 * er kaj ashole kichui na .. she amader redux store theke return kore dibe .. true ba false arki
 */

/**
 * ekhane ekta problem ase .. apni jodi logged in thaken  .. tokhon jodi apni abar login Screen e ashen ..
 * tokhon dekhben je apni Login Screen e jete parsen .. eta kintu ekta shomossha .. mane .. apnake Login
 *  korechen .. apnake to abar amra login screen e jete dite pari na .. apnake ekhon amra Inbox Page e
 * Re-direct korbo .. ejonno amader Public Route gulao Handle korte hobe ..
 */
