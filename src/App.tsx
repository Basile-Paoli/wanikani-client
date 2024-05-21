import {useState} from "react";
import Login from "./components/Login.tsx";
import Profile from "./components/Profile.tsx";
import Navbar from "./components/Navbar.tsx";
import Reviews from "./components/Reviews";
import Lessons from "./components/Lessons.tsx";

const storedToken = localStorage.getItem("apiToken")

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
    const [page, setPage] = useState("profile");
    return (
        isLoggedIn ?
            <>
                <Navbar setIsLoggedIn={setIsLoggedIn} updatePage={setPage}/>
                {page === "reviews" && <Reviews/>}
                {page === "lessons" && <Lessons/>}
                {page === "profile" && <Profile/>}
            </>
            : <Login setIsLoggedIn={setIsLoggedIn}/>


    )
}

export default App
