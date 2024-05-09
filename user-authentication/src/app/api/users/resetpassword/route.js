import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
const SECRET_KEY = 'jsonwebtoken'
import { user } from "@/model/user";
import bcryptjs from 'bcryptjs'

export async function POST(NextRequest){
    try {
        const body = await NextRequest.json();
        const {id , token , pass} = body;
       
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return NextResponse.json('Failed Authentication Token' , {status: 400});
            }
    
            // Check if token has expired
            const now = Math.floor(Date.now() / 1000); // Current time in seconds
            if (decoded.exp <= now) {
                return NextResponse.json('Token has Expired' , {status: 400});
            }
        });
       
        const salt = await bcryptjs.genSalt(12);
        const hashed = await bcryptjs.hash(pass, salt);
    

        const isUser = await user.findByIdAndUpdate(id , {$set: {password : hashed}})
        if(!isUser){
            return NextResponse.json('Invalid User' , {status: 400});
        }
        return NextResponse.json('Password Changed Sucessfully' , {status: 200});
    } catch (error) {
        return NextResponse.json(error , {status: 400});
    }
}