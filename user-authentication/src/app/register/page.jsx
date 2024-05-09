'use client'
import axios from "axios"
import Input from "../components/Input"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"



function page() {

    const defaultValue = {
        name: '',
        email: '',
        password: ''
    }
    const router = useRouter();

    const [data , setData] = useState(defaultValue);

    const onValueChange = (e)=>{
        setData({...data , [e.target.name]: e.target.value});
    }
    const onRegister = async(e)=>{
        e.preventDefault();

        if(!data.name || !data.email || !data.password){
            alert('please filled all fileds')
        }

        // API Call

        try {
           let response = await axios.post('/api/users/register' , data);
            
           if(response.status == 200){
                router.push('/login');
           }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
    <div className="bg-white shadow-md rounded px-16 pt-8 pb-12 mb-4">
        <h1 className="text-3xl mb-4 text-center">Register</h1>
        <form className="space-y-4">
            <Input 
                label="Name"
                id="name"
                type="text"
                value={data.name}
                onChange={onValueChange}
            />
            <Input 
                label="Email"
                id="email"
                type="email"
                // value={data.email}
                onChange={onValueChange}
            />  
            <Input 
                label="Password"
                id="password"
                type="password"
                value={data.password}
                onChange={onValueChange}
            />
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
                onClick={(e) => onRegister(e)}  >
                Submit
            </button>
        </form>
        <p className="text-center mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
    </div>
</div>
  )
}

export default page
