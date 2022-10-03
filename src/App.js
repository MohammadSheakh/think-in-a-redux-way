import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    const authChecked = useAuthCheck();

    return !authChecked ? (
        <div>Checking authentication....</div>
    ) : (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/inbox"
                    element={
                        <PrivateRoute>
                            <Conversation />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/inbox/:id"
                    element={
                        <PrivateRoute>
                            <Inbox />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;

// amra ekhon amader login persistency check korbo .. amra login korar pore kintu redux store er upor dependent ..
// mane amra jokhon e log in hocche .. tokhon amra kintu redux store e .. update kore felsi ... amader access token
// and current user ta .. so , tarpor e amader browsing session e amra jodi reload na dei... and amra jodi client
// side e browsing kori .. tahole kintu amar redux store ta persist kore
// and oi redux store er upor thekei amra kintu login informatio niye .. amra check kore cholte pari je amar logged in ase kina ..
// kintu jodi emon hoy je apni reload diye ashlen ba .. browser close kore pore ashlen .. tokhon kintu redux store
// ta gayeb .. oitar persistancy nai .. kintu persist kore ke ? apnar local storage .. jar karonei amra local storage
// set kore chilam ..
// ekhon amader ke jei kaj ta korte hobe .. oi checking ta amra ekhon korbo ..
// 🔗 je amra jodi reload diye ashi... ba amra jodi arek bar browser close kore ashi .. tokhon amra ashole check
//  korbo je .. local storage e amar token ta exist kore kina ..
// tahole ami dhore nibo logged in ..
// 🤐 tahole shei kaj ta check korar jonno .. emon ekta common jaygay check korte hobe amake ei checking ta ..
// jeno .. user jodi hut kore baire theke kono link e click kore jodi amar kono page e chole ashe .. taileo jeno amar
//  checking ta kaj kore ..
// EROKOM EKTA jayga hocche amader application er .. sheta hocche APP.js file
// jekhan e amra amader routing setup korechilam ..
// so, amra ei jayga ta tei checking ta korbo .. je local Storage e amar jinish ta ase kina ..
