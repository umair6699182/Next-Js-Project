



"use client";

import { useState } from "react";
import Input from "../components/Input";

import Link from "next/link";
import axios from "axios";

function page() {

  const DefaultData = {
    email: ''
  }

  const [email , setEmail] = useState(DefaultData);

  const onValueChange = (e)=>{
    setEmail({...email , [e.target.name]: e.target.value }) ;
  }
 
  const onLogin = async (e) => {
    e.preventDefault();
  
   

    // API Call

    try {
      const response = await axios.post('/api/users/forgetpassword' , email);
    console.log(response);
    } catch (error) {
      console.log(error);
    }

   
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded px-16 pt-8 pb-12 mb-4">
        <h1 className="text-3xl mb-6 text-center text-black ">Forget Password</h1>
        <form className="space-y-4">
          <Input
            label="Enter Email"
            id="email"
            type="email"
            onChange={onValueChange}
          />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
            onClick={(e) => onLogin(e)}
          >
            Forget Password
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Go to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default page;
