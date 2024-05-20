import { useState} from "react";
import Login from "./components/Login.tsx";
import Profile from "./components/Profile.tsx";
import Navbar from "./components/Navbar.tsx";
import { ApiTokenContext } from "./Context.ts";

const storedToken = localStorage.getItem("apiToken")

function App() {
    const [apiToken, setApiToken] = useState(storedToken || "");
    const [page, setPage] = useState("profile");
    const updateApiToken = (newToken: string) => {
        setApiToken(newToken)
        localStorage.setItem("apiToken", newToken)
    }
    return (
        apiToken ?
            <>
                <Navbar updateApiToken={updateApiToken} updatePage={setPage}/>
                <ApiTokenContext.Provider value={apiToken}>

                    {page==="profile"&& <Profile/>}
                </ApiTokenContext.Provider>
            </>
            : <Login updateApiToken={updateApiToken}/>


    )
}

export default App
