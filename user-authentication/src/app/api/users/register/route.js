import Connection from "@/database/config";
import { NextRequest, NextResponse } from "next/server";
import { user } from "@/model/user";
import bcryptjs from 'bcryptjs'


Connection();

export async function POST(NextRequest){
    try {
        const body = await NextRequest.json();
        const {name , email , password} = body;
        
        const person =  await user.findOne({email});
        if(person){
            return NextResponse.json('email Already exist' , {status: 500});
        }

       const salt = await bcryptjs.genSalt(12);
       const hashed = await bcryptjs.hash(password, salt);


       const newUser = new user({
        name,
        email,
        password: hashed
       });

       await newUser.save();
    return NextResponse.json('User saved Sucessfully' , {status: 200})
        
    } catch (error) {
        return NextResponse.json(error);
    }
}