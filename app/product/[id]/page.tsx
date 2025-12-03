// app/product/[id]/page.tsx
"use client"
import axios from "axios";
import Link from "next/link";
import { useState,useEffect } from "react";
import { useParams } from "next/navigation";

// Product type
interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: number;
}


export default function ProductDetails() {
    
    const params = useParams();
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

    const [product, setProduct] = useState<Product | null>(null);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`/api/products/${id}`);
            setProduct(res.data);
        } catch (error) {
            console.log("Error fetching product:", error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (!product) {
        return (
        <div className="w-full h-screen flex items-center justify-center text-xl">Product not found.</div>
        );
    }

    return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <Link href="/home" className="text-indigo-600 text-sm">← Back to Home</Link>

        <h1 className="text-3xl font-bold mt-4">{product.title}</h1>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full bg-gray-100 rounded-xl overflow-hidden">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          </div>

          <div>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-2xl font-semibold text-indigo-600">₹{product.price}</span>
              {/* <span className="text-yellow-500">⭐ {product.rating}</span> */}
            </div>

            <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700">
              Buy Now
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">Additional Details</h2>
          <ul className="mt-3 text-gray-600 space-y-2 list-disc list-inside">
            <li>Fast Delivery</li>
            <li>7-day return policy</li>
            <li>Secure checkout</li>
          </ul>
        </div>
      </div>
    </div>
    );
}
