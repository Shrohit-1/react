import React, { useEffect, useState } from "react";
import { auth } from "../firebase";


export const AuthContext= React.createContext();


export function AuthProvider({children}){
    const [User,setUser]= useState(null);
    const [loading,setLoading] = useState(true);

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password);

    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }

    function logout(){
        return auth.signOut();
    }

    useEffect(()=>{
        //componentdidmount
        const unsub = auth.onAuthStateChanged((user)=>{
            setUser(user);
            //console.log(user);
            setLoading(false);
        })
        //componentwillunmount 
        return ()=>{
            unsub();
        }
    },[])

    const store = {
        User,
        login,
        signup,
        logout
    }

    return(
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )
}