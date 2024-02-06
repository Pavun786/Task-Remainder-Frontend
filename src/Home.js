import React from "react";
import CreateTask from "./CreateTask";
import GetAllTask from "./GetAllTask";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


const Home = ()=>{

    const navigate = useNavigate()

    const UserName = localStorage.getItem("username")

    const logout = () =>{
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        navigate("/")
    }

    return(
        <div>
            <h2>Welocome #{UserName}</h2>
            <Button variant="contained" color="success" onClick={()=>navigate("/create")}>+ Add new task</Button>
            <Button variant="contained" color="warning" onClick={()=>logout()}>LogOut</Button>

            <GetAllTask/>
        </div>
    )
}
export default Home;