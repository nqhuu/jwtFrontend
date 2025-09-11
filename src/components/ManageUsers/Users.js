import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import "./Users.scss"
const Users = (props) => {

    let history = useHistory()
    useEffect(() => {

        //gọi dữ liệu dưới sessionStorage lên để validate đăng nhập
        let session = JSON.parse(sessionStorage.getItem("account"));
        if (!session) {
            history.push("/login")
        }
    }, [])

    return (
        < div >
            All User
        </div >
    )
};

export default Users;