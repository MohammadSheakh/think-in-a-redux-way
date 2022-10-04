import { useSelector } from "react-redux";

export default function useAuth() {
    // er kaj ashole kichui na .. she amader redux store theke return kore dibe .. true ba false arki

    const auth = useSelector((state) => state.auth);

    if (auth?.accessToken && auth?.user) {
        return true;
    } else {
        return false;
    }
}

/**
 * Logged in Thaka ba na thakar bepar ta kintu amader redux store e ase ..
 * sheta ami Component e UseSelector diye nite pari .. kintu sheta jeno re-useable hoy .. shetar  jonno
 * amra ekta hook baniye nicchi ..
 *
 * er kaj ashole kichui na .. she amader redux store theke return kore dibe .. true ba false arki
 */
