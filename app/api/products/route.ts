import {connect} from "@/dbConfig/dbConfig"
import Product from "@/models/productModel"
import { NextRequest, NextResponse } from "next/server"

connect();

export async function POST(request : NextRequest) {
    try {
        const reqBody = await request.json();
        const {title, description, image, price, quantity, adminEmail} = reqBody

        const newProduct = new Product({
            title, description, image, price, quantity, adminEmail
        })

        const saveProduct = newProduct.save();

        return NextResponse.json({
            message: "Product added successfully",
            success: true,
            saveProduct
        })
        
    } catch (error: any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}


