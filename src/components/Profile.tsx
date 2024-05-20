import {useContext, useEffect, useState} from "react";
import {ApiTokenContext} from "../Context";
import Pog from "../assets/pog.png";

type UserInfo = {
    username: string
    level: number
}
export default function Profile() {
    const apiToken = useContext(ApiTokenContext);
    const [userInfo , setUserInfo] = useState<UserInfo>()
    useEffect(() => {
        fetch("https://api.wanikani.com/v2/user", {
            headers: {Authorization: `Bearer ${apiToken}`}
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("Invalid token")
                } else {
                    response.json().then((data) => {
                        setUserInfo(data.data)
                    })
                }

            })
    }, [apiToken]);

    return (
        <>
            <div className=" m-0 flex justify-center  mt-8">
                <div className="p-10 bg-white shadow-md rounded-lg flex flex-col w-[300px]  ">
                    <div className="flex w-full justify-center mb-6">
                        <img className="w-[100px] bg-gray-300 rounded-full p-2" src={Pog}/>
                    </div>
                    <div className="text-2xl font-semibold">{userInfo?.username}</div>
                    <div className="text-lg">Level {userInfo?.level}</div>
                </div>
            </div>
        </>
    );
}
