"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

// for typescript 
type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  quantity:number;
  adminEmail:string;
  rating: number;
};

function formatPrice(n: number) {
  // rupee formatting
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function HomePage() {

  const[products, setProducts] = useState<Product[]>([]);
  const[loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/getAllProducts")
      setProducts(response.data);
    } catch (error:any) {
      console.log("Login Failed", error.message);
      toast.error(error.message);
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts();
  },[])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl">
        Loading products...
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/home" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">S</div>
                <span className="font-semibold text-lg">Shopify</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {/* <Link href="#" className="hover:text-indigo-600">Home</Link> */}
              <Link href="/login" className="hover:text-indigo-600">Login</Link>
              <Link href="/signup" className="hover:text-indigo-600">Signup</Link>
              <Link href="/admin" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                Be an Admin
              </Link>
            </nav>

            <div className="md:hidden">
              {/* simple mobile menu button (you can wire it to open a drawer) */}
              <button aria-label="Open menu" className="p-2 rounded-md hover:bg-gray-100">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-8 flex items-center justify-between gap-6 shadow-md">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold">Find what you love — fast</h1>
            <p className="mt-2 text-indigo-100/90">Curated gadgets, accessories and everyday essentials. Quality products, honest prices.</p>
            <div className="mt-4 flex gap-3">
              <Link href="#products" className="inline-flex items-center px-4 py-2 bg-white text-indigo-700 rounded-md font-medium shadow-sm">Shop Now</Link>
              <Link href="#" className="inline-flex items-center px-4 py-2 border border-white/30 rounded-md">Explore</Link>
            </div>
          </div>
          <div className="hidden md:block w-56">
            <img src="https://plus.unsplash.com/premium_photo-1757322537445-892532434841?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="hero" className="rounded-lg shadow-lg" />
          </div>
        </section>

        {/* HORIZONTAL SCROLLABLE PRODUCT ROW */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Trending products</h2>
            <Link href="#products" className="text-sm text-indigo-600">See all</Link>
          </div>

          <div className="overflow-x-auto no-scrollbar py-2">
            <div className="flex gap-4 w-max">
              {products.map((p) => (
                <article key={p._id} className="min-w-[230px] bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition p-4">
                  <div className="w-52 h-40 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <Link href={`/product/${p._id}`}>
                    <img src={p.image} alt={p.title} className="object-cover w-full h-full" />
                    </Link>
                  </div>
                  <h3 className="mt-3 font-medium text-sm">{p.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{p.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-indigo-600 font-semibold">{formatPrice(p.price)}</div>
                    <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md">Add</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* GRID OF PRODUCTS - scrollable vertically as usual page */}
        <section id="products" className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">All products</h2>
            <div className="text-sm text-gray-500">Showing {products.length} results</div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p._id} className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="aspect-[4/3] bg-gray-100">
                  <Link href={`/product/${p._id}`}>
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </Link>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm">{p.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <div className="text-indigo-600 font-semibold">{formatPrice(p.price)}</div>
                    <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md">Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-12 pb-8 text-sm text-gray-500">
          <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© {new Date().getFullYear()} Shopify. All rights reserved.</div>
            <div className="flex gap-4">
              <Link href="#">Privacy</Link>
              <Link href="#">Terms</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

/*
  Notes & tips:
  - This component uses plain <img> tags to keep things simple. If you want to use next/image,
    replace <img> with Image from 'next/image' and add domains to next.config.js.
  - To enable Tailwind CSS, make sure you have tailwind installed and configured in your project.
  - You can replace products with data fetched from your API (getStaticProps/getServerSideProps) or a CMS.
  - The horizontal product row uses `overflow-x-auto` which makes it scrollable on small screens.
*/
