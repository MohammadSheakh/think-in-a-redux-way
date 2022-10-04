import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
    const isLoggedIn = useAuth();

    return isLoggedIn ? children : <Navigate to="/" />;
}

/**
 * jodi user logged in thake .. taile Private Route diye jake Wrap kore diyecho .. take jete
 * diba ..
 */
