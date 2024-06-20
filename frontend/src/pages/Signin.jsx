import {Heading} from "../components/Heading"
import {SubHeading} from "../components/SubHeading";
import {InputBox} from "../components/InputBox";
import {Submit} from "../components/Submit";
import {BottomWarning} from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Signin =()=>{
    const [username , setUsername]=useState("");
    const [password , setPassword]=useState("");
    const navigate = useNavigate();

    return<>
    <div className="bg-red-100  h-screen flex justify-center">
            <div className="flex flex-col justify center">
                <div className=" p-4 m-4 w-80 h-max text-center bg-red-300 bg-opacity-50 border-red-500 rounded shadow-lg opacity-75 ">
                <Heading label={"Sign In"}></Heading>
                <SubHeading data={"Login to your Account"}/>
                    <InputBox onChange={(e)=>{
                        setUsername(e.target.value);
                        }} label={"Username"} placeholder={"john.doe"}/>
                    <InputBox onChange={(e)=>{
                        setPassword(e.target.value);
                        }} label={"Password"} placeholder={"Password"}/>
                    <Submit  onClick={async ()=>{
                        await axios.post("http://localhost:3000/api/v1/user/signin",
                            {
                                username,
                                password,
                            }).then(response =>{
                                localStorage.setItem('token', response.data.token);
                                localStorage.setItem('username',username);
                                navigate("/dashboard");
                            })
                    }}text={"Submit"} />
                    <BottomWarning label={"No Account? SignUp instead"} kindOf={"  SignUp"} to={"/signup"}/>
                <div></div>
                </div>
            </div>
        </div>
    </>
    
}

export {Signin};