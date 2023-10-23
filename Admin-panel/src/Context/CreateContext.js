import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react';
const MyContext= createContext();
const ContextProvider = ({children}) => {
    const [user,setUser]= useState();
    useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem('authToken'));
        console.log(userInfo)
        setUser(userInfo);
    });
  return (<MyContext.Provider value={{user,setUser}}>{children}</MyContext.Provider>);
}
export const UserState=()=>{
    return useContext(MyContext);
}
export default ContextProvider;