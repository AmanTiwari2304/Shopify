import {connect} from "@/dbConfig/dbConfig";
import Admin from "@/models/adminModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
// import { sendEmail } from "@/helper/mailer";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {adminname, email, password} = reqBody
        console.log(reqBody)
        
        // check if admin already exists
        const admin = await Admin.findOne({email})

        if(admin){
            return NextResponse.json({error:"Admin already exists"},{status:400})
        }

        // hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newAdmin = new Admin({
            adminname,
            email,
            password: hashedPassword
        })
        const savedAdmin = await newAdmin.save();
        console.log(savedAdmin)

        // await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "Admin created successfully",
            success: true,
            savedAdmin
        })

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}