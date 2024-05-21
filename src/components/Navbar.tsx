import Logo from "../assets/wanikani-logo.png";
import React, {memo, useEffect, useRef, useState} from "react";
import pog from "../assets/pog.png";
import {apiUrl} from "../Context";

type propsType = {
    setIsLoggedIn: (isLoggedIn: boolean) => void,
    updatePage: (newPage: string) => void
}

function Navbar({setIsLoggedIn, updatePage}: propsType) {


    const [reviewCount, setReviewCount] = useState<number | null>(null)
    useEffect(() => {
        fetch(`${apiUrl}/assignments?immediately_available_for_review`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("apiToken")}`}
        })
            .then((response) => response.json())
            .then((data) => {
                setReviewCount(data.total_count)
            })
    }, [])
    const [lessonCount, setLessonCount] = useState<number | null>(null)
    useEffect(() => {
        fetch(`${apiUrl}/assignments?immediately_available_for_lessons`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("apiToken")}`}
        })
            .then((response) => response.json())
            .then((data) => {
                setLessonCount(data.total_count)
            })
    }, [])
    const sectionClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const {name} = e.target as HTMLButtonElement
        updatePage(name)
        setMenuDisplay(false)
    }
    const [menuDisplay, setMenuDisplay] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuDisplay(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, []);

    return (
        <div className="flex  h-12 w-full font-semibold justify-between border-black border-b border-opacity-25 ">
            <div className="flex justify-center space-x-4 ml-3">
                <a href="https://wanikani.com"><img className="p-2 h-12" src={Logo} alt="Wanikani Logo"/></a>
                <button onClick={sectionClickHandler} name="lessons" className="">
                    Lessons {lessonCount && `(${lessonCount})`}
                </button>
                <button onClick={sectionClickHandler} name="reviews">
                    Reviews {reviewCount && `(${reviewCount})`}
                </button>
            </div>
            <div className="content-center mr-6 relative">
                <img src={pog} className="cursor-pointer  max-w-10" onClick={() => {
                    setMenuDisplay(!menuDisplay)
                }}/>
                {menuDisplay &&
                    <div ref={menuRef} className="absolute right-0 flex-col flex right">
                        <div
                            className="bg-gray-800 h-4 aspect-square w-4 rotate-45 translate-x-[118px] translate-y-2.5">
                        </div>
                        <div className="flex flex-col p-6 bg-gray-800 w-36  rounded gap-3 text-white">
                            <button
                                className="text-center " name="profile" onClick={sectionClickHandler}>Profile
                            </button>
                            <button
                                className="text-center " onClick={() => setIsLoggedIn(false)}>Log out
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

const NavbarMemo = memo(Navbar);
export default NavbarMemo;