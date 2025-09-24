import React, { useContext, useState, useEffect } from 'react';
import userService from '../services/userService';
import { useLocation } from 'react-router-dom'


const UserContext = React.createContext(null);
const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        Authenticated: false,
        token: "",
        account: {},
        isLoading: true
    });


    useEffect(() => {
        // if (window.location.pathname !== "/") {
        fetchUserAccount();
        // }
    }, []);

    const fetchUserAccount = async () => {
        let response = await userService.getUserAccount();

        if (response && response.EC === 0) {
            let role = response.DT.role;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token;
            let userId = response.DT.userId;
            let data = {
                Authenticated: true,
                token: token,
                account: { email, username, role, userId },
                isLoading: false
            }
            setUser(data);
        }
        // if (response && response.EC !== 0) {
        //     toast.error(response.EM)
        // }
    }

    const loginContext = (data) => {
        setUser(data);
    }

    const logout = () => {
        setUser({
            Authenticated: false,
            token: "",
            account: {}
        });
    }
    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};
export { UserProvider, UserContext };