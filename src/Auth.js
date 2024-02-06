import React from "react";
import { Navigate } from "react-router-dom";




const Auth = ({children}) =>{

    const Authtoken = localStorage.getItem("token")
    console.log(Authtoken)

    return(
       <div>
        { Authtoken ? children : <Navigate replace to="/"/> }
        </div>
    )
}
export default Auth;