import "./registration.css"
import useAuthContext from "../../hooks/useAuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userInputs } from "./UserInput";
import {ToastContainer,  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Registration = () => {
        const [credentials, setCredentials] = useState({
            userName:undefined,
            password:undefined,
            email:undefined,
            phone:undefined,
            country:undefined,
            city:undefined,
        })
       const {user,loading,error,dispatch} = useAuthContext();
    
       const navTo = useNavigate();
    
        const handleChange =(e)=>{
            setCredentials(pre=>({...pre,[e.target.name]:e.target.value}))
        }
        const handleRegistration = async(e)=>{
            e.preventDefault();
            try {
                const res =await axios.post("/api/auth/registration",credentials,{withCredentials:true});
                const message = res.data;
                 navTo("/login",{state:{message}})
            } catch (err) {
                toast.error(err.response.data.message)
                console.log(err);
            }
        }
        
      return (
        <div className="registration">
            <div className="rcontext registrationContainer">

            <div className="all_input_container">
            {userInputs.map((input)=>(
                <div className="indi_input" key={input.id}>
                    <label>{input.label}</label>
                    <input  placeholder={input.placeholder} type={input.type} name={input.id} 
                    onChange={handleChange} required /> 
                </div>
            ))}

            </div>

            <button onClick={handleRegistration} className="loginButtonr">Register </button>
            <Link to="/login"><span className="register">Log In</span> </Link>
            </div>








            {/* /*needed for the circles *\ */}
            <div className="area" >
                <ul className="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                </ul>
            </div >
            <ToastContainer/>
        </div>
  
    
    
  )
}

export default Registration
