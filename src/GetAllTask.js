import React,{useState,useEffect} from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { API } from "./Globle";


const GetAllTask = ()=>{

    const [tasks,setTasks] = useState([])
   
    const navigate = useNavigate()

    const emailId = localStorage.getItem("email")
    console.log(emailId)

    const fetchData = ()=>{
        fetch(`${API}/task/email/${emailId}`,{
        method :"GET",
        headers : {
          "Auth" : localStorage.getItem("token")
        }
      })
      .then((dt)=>dt.json())
   
      .then((value)=> setTasks(value))
     

      

    }      

    useEffect(()=>{
     fetchData()
 },[])

 tasks.map((ele,index)=>{

    tasks[index].deadline = convertTime(ele.deadline, 5, 30);
      
  })
     
//      console.log(tasks)

function convertTime(inputTimeStr, hoursToAdd, minutesToAdd) {
  const options = {
                 timeZone: 'Asia/Kolkata',
                 hour12: false, // If you want 24-hour format
                 year: 'numeric',
                 month: 'numeric',
                 day: 'numeric',
                 hour: 'numeric',
                 minute: 'numeric',
                 second: 'numeric',
               };
               
               const date = new Date(inputTimeStr);
               const indianDateTime = new Intl.DateTimeFormat('en-IN', options).format(date);
               
               return indianDateTime;
     
              }


  const deleteTask = async(_id)=>{
      
    const data = await fetch(`${API}/task/${_id}`,{
        method :"DELETE",
        headers : {
          "Auth" : localStorage.getItem("token")
        }
    })

    const result = await data.json()  

    if(result.status == 400 ){
        alert("Failed to delete")
        
     } else {
        alert("Task deleted successfully") 
        fetchData()
    }   

  }

    return(
        <div>
          
          <table>
            <thead>
            <tr>
                <th>S.no</th>
                <th>Task Name</th>
                <th>Status</th>
                <th>Created Time</th>
                <th>Deadline Time</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                {tasks.map((ele,index)=>{
                    return(
                        <tr key={index} >
                            <td>{index+1}</td>
                            <td>{ele.taskName}</td>
                            <td>{ele.status}</td>
                            <td>{ele.createdTime}</td>
                            
                            <td>{ele.deadline}</td>
                            <td>
                          {ele.status == "Pending" || ele.status == "Completed" ? <Button variant="contained" onClick={()=> navigate(`/edit/${ele._id}`)}>Edit</Button> : <Button variant="contained" disabled="true" onClick={()=> navigate(`/edit/${ele._id}`)}>Edit</Button> }  
                            <Button variant="contained" onClick={()=>deleteTask(ele._id)}>Delete</Button>
                           
                            </td>
                        </tr>
                    )
                })}
            </tbody>
          </table>
        </div>
    )
}
export default GetAllTask;

