import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import {Heading} from "../components/Heading"
import {SubHeading} from "../components/SubHeading";
import {InputBox} from "../components/InputBox";
import {Submit} from "../components/Submit";
import {BottomWarning} from "../components/BottomWarning";

function SignUp (){
    const [firstName ,setFirstName]=useState("");
    const [lastName ,setLastName]=useState("");
    const [username ,setUsername]=useState("");
    const [email ,setEmail]=useState("");
    const [password ,setPassword]=useState("");
    const navigate = useNavigate();

    return <>
        <div className="bg-red-100  h-screen flex justify-center">
            <div className="flex flex-col justify center">
                <div className=" p-4 m-4 w-80 h-max text-center bg-red-300 bg-opacity-50 border-red-500 rounded shadow-lg opacity-75 ">
                <Heading label={"Sign Up"}></Heading>
                <SubHeading data={"Create your account to get started."}/>
                <InputBox onChange={(e)=>{
                        setFirstName(e.target.value)
                        }} label={"First Name"} placeholder={"John"}/>
                    <InputBox onChange={(e)=>{
                        setLastName(e.target.value);
                        }} label={"Last Name"} placeholder={"Doe"}/>
                    <InputBox onChange={(e)=>{
                        setUsername(e.target.value);
                        }} label={"Username"} placeholder={"john.doe"}/>
                    <InputBox onChange={(e)=>{
                        setEmail(e.target.value);
                        }} label={"Email"} placeholder={"john.doe@gmail.com"}/>
                    <InputBox onChange={(e)=>{
                        setPassword(e.target.value);
                        }} label={"Password"} placeholder={"Password"}/>
                    <Submit  onClick={async ()=>{
                        await axios.post("http://localhost:3000/api/v1/user/signup",
                            {
                                firstName,
                                lastName,
                                username,
                                email,
                                password,
                                // need to redirect it to sign in page as to sign in 
                            }).then(response =>{
                                // localStorage.setItem('token', response.data.token);
                                // localStorage.setItem('first',firstName);
                                navigate("/signin");
                            })
                    }}text={"Submit"} />
                    <BottomWarning label={"Already have an account ?"} kindOf={"  Signin"} to={"/signin"}/>
                <div></div>
                </div>
            </div>
        </div>
    </>
}
export   {SignUp};