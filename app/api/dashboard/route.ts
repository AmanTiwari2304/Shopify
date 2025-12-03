import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connect();

        // accept ?adminEmail=... or JSON body { adminEmail: "..." }
        const url = new URL(request.url);
        let adminEmail = url.searchParams.get("adminEmail") || undefined;

        if (!adminEmail) {
            try {
                const body = await request.json();
                adminEmail = body?.adminEmail;
            } catch {
                // no JSON body
            }
        }

        if (!adminEmail) {
            return NextResponse.json({ message: "adminEmail is required" }, { status: 400 });
        }

        // select only the fields you need
        const products = await Product.find({ adminEmail }).select("title image quantity ").lean();

        // ensure consistent shape
        const result = products.map(p => ({
            title: p.title,
            image: p.image,
            quantity: p.quantity
        }));

        return NextResponse.json({ products: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}