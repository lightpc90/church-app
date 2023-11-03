import connectDB from "@/models/connectDB";
import { NextResponse } from "next/server";
import User from "@/models/User";


export async function POST(req) {
    try {
        await connectDB()
        const { firstname, lastname, phone, email, hashedPassword, username, birthdayMonth, birthdayDay, dept, gender, verified } = req.json();
        
        const newUser = await User.create({
          firstname,
          lastname,
          phone,
          email,
          hashedPassword,
          username,
          birthdayMonth,
          birthdayDay,
          dept,
          gender,
          verified,
        });
        if (newUser) {
          console.log("New user Created!") 
          return NextResponse.json({
            success: true,
            message: 'Account created successfully',
          })
        } else {
           return NextResponse.json({
             success: false,
             message: "User Registration failed! Please try again!",
           }); 
        }
     } catch (err) {
        console.log(err)

        return NextResponse.json({
            success: false,
            message: err.message || 'Something went wrong'
        })
    }
}