import React,{useState} from "react";
import { useFormik } from "formik";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from "yup";
import {Link, useNavigate} from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

 import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
 import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
 import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import dayjs from 'dayjs';
import {API} from "./Globle"

const CreateTask = () =>{

    const navigate = useNavigate()

    const [value, setValue] = useState(dayjs(""));
    console.log(value)

    const createValidationSchema = yup.object({
        taskName : yup.string().required(),
        status : yup.string().required(),
        
    })

   

    const formik = useFormik({
        initialValues : {
             taskName : "",
             status : "",
            //  deadline : value
        },

        validationSchema : createValidationSchema,

        onSubmit :(values)=>{
            values.email=localStorage.getItem("email")
            values.deadline = value.$d
            console.log(values)
            addTask(values)
        }
    })

    
    const addTask = async(values)=>{

        console.log(values)

        const data = await fetch(`${API}/task/createTask`,{
            method :"POST",
             headers : {
                "Auth" : localStorage.getItem("token")
             },
             body : JSON.stringify(values)
           })

        const result = await data.json()  

        if(result.status == 400 ){
            alert("Failed to create")
            
         } else {
            alert("Task created successfully") 
            navigate("/home")
        }   

    }
 
  return(
        <form onSubmit={formik.handleSubmit} className="createForm">
        <h3>Task create Form</h3>
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
        onChange={(newValue) => setValue(newValue)}
        value={value}
        
        />
      </DemoContainer>
    </LocalizationProvider>

         <Button variant="contained" type="submit">create</Button>
        </form>
    )
}
export default CreateTask;