import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute({ children }) {
    const isLoggedIn = useAuth();

    return !isLoggedIn ? children : <Navigate to="/inbox" />;
}
/**
 * ekhane ekta problem ase .. apni jodi logged in thaken  .. tokhon jodi apni abar login Screen e ashen ..
 * tokhon dekhben je apni Login Screen e jete parsen .. eta kintu ekta shomossha .. mane .. apnake Login
 *  korechen .. apnake to abar amra login screen e jete dite pari na .. apnake ekhon amra Inbox Page e
 * Re-direct korbo .. ejonno amader Public Route gulao Handle korte hobe ..
 */
