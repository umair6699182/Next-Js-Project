
import { user } from "@/model/user";
import { NextResponse } from "next/server";
import Connection from "@/database/config";
import  nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
const SECRET_KEY = 'jsonwebtoken'


Connection();

export async function POST(NextRequest){
    
    try {
        const body = await NextRequest.json();
        const {email} = body;
    
        const isUser = await user.findOne({email : email});
        if(!isUser){
            return NextResponse.json({message: 'Email are incorect'} , {status: 400});
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.elasticemail.com",
            port: 2525,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "um83414@gmail.com",
              pass: "DD157B1A9C79192F0BC7BB812CD908D1662E",
            },
          });

        const token = jwt.sign({email : isUser.email , id: isUser._id} , SECRET_KEY , {expiresIn: '1m'})
   

        const resetLink = `http://localhost:3000/resetpassword/${isUser._id}/${token}`;


        const mailOptions = {
            from: 'um83414@gmail.com',
            to: email,
            subject: 'Password Reset Link',
            html: `
              <p>Click on this link to reset your password:</p>
              <a href=${resetLink}>${resetLink}</a>
            `
          };

          await transporter.sendMail(mailOptions);


        return NextResponse.json({message: 'Password reset link sent successfully!'} , {status: 200});
    } catch (error) {
        return NextResponse.json( error , {status: 200});
    }

}