import React from "react";
import {useFormik} from "formik";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from "yup";
import {Link, useNavigate} from "react-router-dom"
import { API } from "./Globle";


const Login = ()=>{

    const navigate = useNavigate()

    const loginValidationSchema = yup.object({
       
        email : yup.string().required().min(4),
        password : yup.string().required()
    })

   const formik = useFormik({

       initialValues : {
          email : "",
          password : ""
       },

       validationSchema : loginValidationSchema,

       onSubmit : (values) =>{
          createAccount(values)
       }

   })

   const createAccount = async (values) =>{
   const data = await fetch(`${API}/auth/login`,{
        method :"POST",
         headers : {
            "Content-type" : "application/json"
         },
         body : JSON.stringify(values)
       })

      if(data.status == 401){
         alert("UnAuthorized")
      } else{
        const result = await data.json()
        alert("Login successfully..!")
        localStorage.setItem("token",result.token)
        localStorage.setItem("email",result.email)
        localStorage.setItem("username",result.username)
        navigate("/home")
      }
   
   }

    return(
        
         
          <form onSubmit={formik.handleSubmit} className="login">
          <h2>Login Form</h2>
         
        <TextField id="filled-basic" 
          label="Email" 
          variant="filled"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
          />
         <TextField id="filled-basic" 
          label="Password" 
          variant="filled"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          error = {formik.touched.password && formik.errors.password}
          helperText ={formik.touched.password && formik.errors.password ? formik.errors.password : null}
          />
          <Button variant="contained" type="submit">submit</Button>
          <p>Are you new user ? <Link to="/register">Register</Link></p>
          </form>
        
    )
}

export default Login;


