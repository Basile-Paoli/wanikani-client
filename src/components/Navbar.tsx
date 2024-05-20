import Logo from "../assets/wanikani-logo.png";
import React, {memo, useState} from "react";
import pog from "../assets/pog.png";

type propsType = {
    updateApiToken: (newToken: string) => void,
    updatePage: (newPage: string) => void
}

function Navbar({updateApiToken, updatePage}: propsType) {
    const clickHandler  = ( e : React.MouseEvent<HTMLButtonElement>) => {
        const {name} = e.target as HTMLButtonElement
        updatePage(name)
        setMenuDisplay(false)
    }
    const [menuDisplay, setMenuDisplay] = useState(false)

    return (
        <div className="flex  h-10 w-full font-semibold justify-between border-black border-b border-opacity-25 ">
            <img className=" p-2  " src={Logo} alt="React Logo"/>
            <div className="flex justify-center space-x-4">
                <button onClick={clickHandler} name="lessons" className="">
                    Lessons
                </button>
                <button onClick={clickHandler} name="reviews">
                    Reviews
                </button>
            </div>
            <div className="content-center mr-2 min-w-[57px]">
                <img src={pog} className="cursor-pointer  max-w-10" onClick={()=>{setMenuDisplay(!menuDisplay)}}/>
                {menuDisplay &&
                    <div className="absolute">
                        <button className="text-center" name="profile" onClick={clickHandler}>Profile</button>
                        <button className="text-center" onClick={() => updateApiToken("")}>Log out</button>
                    </div>
                }
            </div>
        </div>
    );
}

const NavbarMemo = memo(Navbar);
export default NavbarMemo;