import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const products = await Product.find().lean();
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
