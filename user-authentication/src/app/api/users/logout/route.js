
import Connection from "@/database/config";
import { NextResponse } from "next/server";

Connection();

export async function GET(NextRequest){
        try{

       const response = NextResponse.json({message: 'User Logout Sucessfull'} , {status: 200});

       response.cookies.set('token' , '' ,{httpOnly: true , expires: new Date(0)});
       return response;



    } catch (error) {
         return NextResponse.json({message: 'Something Error In Logout API password'} , {status: 400});
    }
}