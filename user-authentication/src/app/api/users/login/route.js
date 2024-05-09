
import { user } from "@/model/user";
import Connection from "@/database/config";
import bcryptjs from 'bcryptjs'
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
const SECRET_KEY = 'jsonwebtoken'
Connection();

export async function POST(NextRequest){
    try {
        const body = await NextRequest.json();
        const {email , password} = body;
      

       let newUser =  await user.findOne({email : email});
       if(!newUser){
        return NextResponse.json({message: 'email does not exist'} , {status: 400});
       }

      let validPassword =  await bcryptjs.compare(password , newUser.password);
       if(!validPassword){
        return NextResponse.json({message: 'incorrect password'} , {status: 400});
       }


       let tokenData = {
        email: newUser.email,
        id: newUser._id
       }
       const token = jwt.sign(tokenData , SECRET_KEY , {expiresIn: '1d'});

       const response = NextResponse.json({message: 'User Login Sucessfully'} , {status: 200});

       response.cookies.set('token' , token ,{httpOnly: true});
       return response;



    } catch (error) {
         return NextResponse.json({message: 'Something Error In Login API password'} , {status: 400});
    }
}