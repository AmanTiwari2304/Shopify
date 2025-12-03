import {connect} from "@/dbConfig/dbConfig";
import Admin from "@/models/adminModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"


export async function POST(request: NextRequest){
    await connect();
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        // check if admin exists
        const admin = await Admin.findOne({email});
        if(!admin){
            return NextResponse.json({error: "Admin does not exists" }, {status: 400})
        }

        // check valid password
        const validPassword = await bcrypt.compare(password, admin.password);
        if(!validPassword){
            return NextResponse.json({error: "Wrong Password" }, {status: 400})
        }

        

        const response  = NextResponse.json({
            message : "Admin details successfully checked",
            success: true,
        })
        
        return response;

    } catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}