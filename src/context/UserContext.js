import { createContext, useReducer, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export const UserContext = createContext("");

// const initialState = [];

export const UserContextProvider = ({children}) => {

    const [userId, setUserId] = useState(() => {
        const storedValue = window.localStorage.getItem("userId");
        
        return storedValue !== null ? JSON.parse(storedValue) : storedValue;
    });

    const { user, isAuthenticated } = useAuth0();
    const [verifiedUser, setVerifiedUser] = useState("");
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        isAuthenticated === true && fetch('/user', {
            method: 'POST', 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({ user: user })
        })
            .then(res => res.json())
            .then((data) => {
                setVerifiedUser(data.data);
                console.log(data.data);
                window.localStorage.setItem("userId", JSON.stringify(data.data));
                setUserId(data.data._id);
                console.log(data.data)
            })

    }, [isAuthenticated])

    // useEffect(() => {
    //     favorites !== null && fetch('/favorites', {
    //         method: 'PATCH', 
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json"
    //         }, 
    //         body: JSON.stringify({ favorites: favorites })
    //     })
    //     .then(res => res.json())
    //     .then((data) => {
    //         setFavorites(data.data);
    //         console.log(data.data);
    //     })
    // }, [])


return (
    <UserContext.Provider value={{userId, setFavorites}}>
        {children}
    </UserContext.Provider>
)
};