import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/lws-logo-light.svg";
import Error from "../components/ui/Error";
import { useRegisterMutation } from "../features/auth/authApi";

export default function Register() {
    // form er state gula local state diye handle korte hobe ..
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreed, setAgreed] = useState(false); // checkbox
    const [error, setError] = useState(""); // password confirm passoword na match korle .. jei error dekhabo
    // sheta ekhane rakhbo

    // error nam e already ekta jinish declare korechi .. tai alias kore dilam
    const [register, { data, isLoading, error: responseError }] = //isError o ante partam .. tobe ami error message tai niye ashlam .. jodi kono error thake
        useRegisterMutation(); /// Hook ta call korle .. tara amake API function ta diye dey .. sheta amra
    // onSubmit e call korbo .. er moddhe data pass kore dibo ... // authApi theke hook ta ashse ..
    // amra ekta tuple pai .. tar moddhe amra register function ta pabo .. and etar je data gula ..
    // jei response gula .. sheta amra data er moddhe pabo ..

    const navigate = useNavigate();

    useEffect(() => {
        // register ta jodi successful hoy .. taile
        console.log("data from components > pages > Register.js : 🔗", data);
        console.log("error from components > pages > Register.js : 🔗", error);
        if (responseError?.data) {
            // mane amar error hoyeche ..
            setError(responseError.data);
        }
        if (data?.accessToken && data?.user) {
            // jodi successful hoy ..
            navigate("/inbox"); // tahole ami ta ke /inbox e navigate kore dibo ..
        }
        // data, responseError, navigate .. ei 3 ta jinish jodi change hoy .. taile ei useEffect ta call hobe ..
    }, [data, responseError, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setError(""); // Error ta age null kore nilam

        if (confirmPassword !== password) {
            setError("Passwords do not match");
        } else {
            register({
                // form er data ta diye dite hobe ..
                name,
                email,
                password,
            });
            /**
             * handle submit shob kichu thik thak thakle .. she register request korbe ..ekhon register
             * request korar pore ..request ta successful hole ba failed hole .. ami kintu data ,
             * isLoading , isError er moddhe jinish ta ta pai ..
             *
             * submit korar por .. amar register function call korar por .. ei data ta to ami ekhane
             * pabo na .. eta amake useEffect diye dhorte hobe .. karon request ekta gese .. response
             * ta ashbe jokhon .. tar mane ki .. tokhon she data te change anbe .. data first e
             * blank chilo .. ekhon she tar moddhe information vore dibe .. hoy response ashbe .. na hoy
             * error ashbe .. kichu ekta ashbe ..
             */
        }
    };

    return (
        <div className="grid place-items-center h-screen bg-[#F9FAFB">
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <Link to="/">
                            <img
                                className="mx-auto h-12 w-auto"
                                src={logoImage}
                                alt="Learn with sumit"
                            />
                        </Link>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Create your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="Name"
                                    type="Name"
                                    autoComplete="Name"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="sr-only"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="current-confirmPassword"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        {/* ekta check box ase ... */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="agree"
                                    name="agree"
                                    type="checkbox"
                                    className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                                    checked={agreed} // value er jaygay checked likhte hobe ..
                                    required
                                    onChange={
                                        (e) => setAgreed(e.target.checked) ////////////////////////////
                                    }
                                />
                                <label
                                    htmlFor="accept-terms"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Agreed with the terms and condition
                                </label>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                                disabled={isLoading} // loading stage e button disabled kore dicchi
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                                Sign up
                            </button>
                        </div>
                        {error !== "" && <Error message={error} />}
                    </form>
                </div>
            </div>
        </div>
    );
}
