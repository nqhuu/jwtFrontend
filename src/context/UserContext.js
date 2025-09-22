import React, { useContext, useState } from 'react';

const UserContext = React.createContext({ name: '', auth: false });
const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({
        Authenticated: false,
        token: "",
        account: {}
    });
    const loginContext = (data) => {
        setUser(data);
    }

    const logout = () => {
        setUser({
            Authenticated: false,
            token: "",
            account: {}
        });
        // sessionStorage.removeItem("account");
    }
    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};
export { UserProvider, UserContext };