"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";// useNavigator 
import axios from "axios";
import toast from "react-hot-toast";


export default function AdminDetailPage() {
    const router  = useRouter();
    const [admin, setAdmin] = React.useState({
        email:"",
        password:"",
        adminname:""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onAdminDetailbtn = async () => {
        try {
            setLoading(true);
            const response = await axios.post("api/admins", admin);
            console.log("Admin Details logged successfully", response.data)
            // redirect to dashboard including adminEmail as query param
            router.push(`/dashboard?adminEmail=${encodeURIComponent(admin.email)}`);
        } catch (error:any) {
            console.log("Admin Detail failed to store", error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(admin.email.length > 0 && admin.password.length > 0 && admin.adminname.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[admin])

    return(
        
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
                {loading ? "Processing your details":"Fill Admin Details"}</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">

                <div>
                    <label htmlFor="adminname" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Admin name</label>
                    <div className="mt-2">
                    <input id="adminname" type="text" 
                        value={admin.adminname} 
                        onChange={(e) => setAdmin({...admin, adminname: e.target.value})}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Email address</label>
                    <div className="mt-2">
                    <input id="email" type="email"
                        value={admin.email}
                        onChange={(e) => setAdmin({...admin, email: e.target.value})} 
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" />
                    </div>
                </div>

                <div>
                    {/* <div className="flex items-center justify-between"> */}
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Password</label>
                    {/* <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Forgot password?</a>
                    </div> */}
                    {/* </div> */}
                    <div className="mt-2">
                    <input id="password" type="password" 
                        value={admin.password}
                        onChange={(e) => setAdmin({...admin, password: e.target.value})}  
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" />
                    </div>
                </div>

                <div>
                    <button type="button" onClick={onAdminDetailbtn} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500">
                    {buttonDisabled ? "Fill Up Crediantials":"Submit Admin details"}</button>
                </div>

                <div>
                    <Link href="/alreadyAnAdmin" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500">Visit Already An Admin Page</Link>
                </div>
                </form>

            </div>
        </div>
    )
}