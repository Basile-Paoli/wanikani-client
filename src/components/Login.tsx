import {useRef} from "react";

type propsType = {
    setIsLoggedIn: (isLoggedIn: boolean) => void,
}

export default function Login({setIsLoggedIn}: propsType) {
    const inputRef = useRef<HTMLInputElement>(null);

    const submitHandler = () => {
        const token = inputRef.current!.value
        fetch("https://api.wanikani.com/v2/user", {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("Invalid token")
                } else {
                    localStorage.setItem("apiToken", token)
                    setIsLoggedIn(true)
                }

            })
    }

    return (
        <div className="h-full m-0 flex justify-center items-center bg-gray-200">
            <div className="p-10 bg-white shadow-md rounded-lg flex flex-col gap-5">
                <input ref={inputRef} type="password" className="p-2.5 border border-gray-300 rounded shadow-inner"
                       placeholder="Enter API Token"/>
                <button onClick={submitHandler}
                        className="p-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    Log In
                </button>
            </div>
        </div>
    );
}
