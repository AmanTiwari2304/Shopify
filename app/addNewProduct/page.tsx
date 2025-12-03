"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";// useNavigator 
import axios from "axios";
import toast from "react-hot-toast";


export default function AddNewProductPage() {
    const router  = useRouter();
    const [product, setProduct] = React.useState({
        title:"",
        description:"",
        image:"",
        price:"",
        quantity: "",
        adminEmail: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onProductDetailbtn = async () => {
        try {
            setLoading(true);
            const response = await axios.post("api/products", product);
            console.log("Product Details logged successfully", response.data)
            router.push("/admin");
        } catch (error:any) {
            console.log("Product Detail failed to store", error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(product.title.length > 0 && product.price.length > 0 && product.description.length && product.quantity.length > 0 && product.adminEmail.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[product])

    return(
        
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
                {loading ? "Processing your details":"Product Details"}</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">

                <div>
                    <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Title</label>
                    <div className="mt-2">
                    <input id="title" type="text"
                        value={product.title}
                        onChange={(e) => setProduct({...product, title: e.target.value})} 
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Description</label>
                    <div className="mt-2">
                    <input id="description" type="text" 
                        value={product.description} 
                        onChange={(e) => setProduct({...product, description: e.target.value})}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" />
                    </div>
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Image Link</label>
                    <div className="mt-2">
                    <input id="image" type="any" 
                        value={product.image}
                        onChange={(e) => setProduct({...product, image: e.target.value})}  
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" />
                    </div>
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Price</label>
                    <div className="mt-2">
                    <input id="price" type="number" 
                        value={product.price}
                        onChange={(e) => setProduct({...product, price: e.target.value})}  
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" />
                    </div>
                </div>

                <div>
                    <label htmlFor="quantity" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Quantity you have</label>
                    <div className="mt-2">
                    <input id="quantity" type="number" 
                        value={product.quantity}
                        onChange={(e) => setProduct({...product, quantity: e.target.value})}  
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Email address</label>
                    <div className="mt-2">
                    <input id="email" type="email"
                        value={product.adminEmail}
                        onChange={(e) => setProduct({...product, adminEmail: e.target.value})} 
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" />
                    </div>
                </div>

                <div>
                    <button type="button" onClick={onProductDetailbtn} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500">
                    {buttonDisabled ? "Fill Up Crediantials":"Submit Product Details"}</button>
                </div>

                {/* <div>
                    <Link href="/login" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500">Visit Login Page</Link>
                </div> */}
                </form>

            </div>
        </div>
    )
}