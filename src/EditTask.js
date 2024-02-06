import React,{useState,useEffect} from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from "yup";
import {Link, useNavigate} from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
 import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
 import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { API } from "./Globle";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';




dayjs.extend(customParseFormat);
dayjs.extend(utc);


const EditTask = ()=>{

    const[singleTask,setSingleTask] = useState("")
    const {id} = useParams();

    const singleData = ()=>{
        fetch(`${API}/task/${id}`,{
            method : "GET",
            headers :{
                "Auth" : localStorage.getItem("token")
            }
        })
        .then((dt)=> dt.json())
        .then((value)=> setSingleTask(value))
    }

    useEffect(()=>{
        singleData()
    },[])

    console.log(singleTask)

    return(
        <div>
         {singleTask ? <EditTaskForm singleTask={singleTask} setSingleTask={setSingleTask}/> : "Loading..."}
        </div>
    )
}

const EditTaskForm = ({singleTask,setSingleTask})=>{

    const navigate = useNavigate()

   
     console.log(singleTask.deadline)
    const [date, setDate] = useState(dayjs(singleTask.deadline));

    console.log(date)



   
   const createValidationSchema = yup.object({
        taskName : yup.string().required(),
        status : yup.string().required(),
        deadline: yup.date()
        
    })

    const formik = useFormik({
        initialValues : {
             taskName : singleTask.taskName,
             status : singleTask.status,
           
        },

        validationSchema : createValidationSchema,

        onSubmit :(value)=>{
            value.deadline = date
            editTask(value)
        }
    })
    
   const editTask = async(value)=>{

        const data = await fetch(`${API}/task/${singleTask._id}`,{
            method :"PUT",
             headers : {
                "Auth" : localStorage.getItem("token")
             },
             body : JSON.stringify(value)
           })

        const result = await data.json()  

        if(result.status == 400 ){
            alert("Failed to update")
            
         } else {
            alert("Task updated successfully") 
            navigate("/home")
        }   

    }
 
  return(
        <form onSubmit={formik.handleSubmit} className="createForm">
        <h3>Task Edit Form</h3>
        <TextField id="filled-basic" 
          label="TaskName" 
          variant="filled"
          name="taskName"
          onChange={formik.handleChange}
          value={formik.values.taskName}
          onBlur={formik.handleBlur}
          error={formik.touched.taskName && formik.errors.taskName}
          helperText = {formik.touched.taskName && formik.errors.taskName ? formik.errors.taskName : null}
          />
         
      <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="status"
          value={formik.values.status}
          label="Status"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.status && formik.errors.status}
        >
          
          <MenuItem value={"Pending"}>Pending</MenuItem>
          <MenuItem value={"Completed"}>Completed</MenuItem>
        </Select>
       <p style={{color:"red"}}> {formik.touched.status && formik.errors.status ? formik.errors.status : null} </p>

       <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker 
        disablePast
        ampm={false} 
        label="Date for Deadline" 
        name="deadline"
        onChange={(newValue) => setDate(newValue)}
        value={date}
      
        
        />
      </DemoContainer>
    </LocalizationProvider>

         <Button variant="contained" type="submit">update</Button>
        </form>
    )
}

export default EditTask;