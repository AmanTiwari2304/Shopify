"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface Product {
  id: string;
  title: string;
  image?: string | null;
  quantity: number;
}

export default function DashboardPage(){
  const searchParams = useSearchParams();
  const adminEmail = searchParams.get("adminEmail") || "";
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        if (!adminEmail) {
          throw new Error("adminEmail not provided in URL");
        }
        // send as query param
        const res = await axios.get("/api/dashboard", { params: { adminEmail } });
        if (!res) throw new Error("Failed to load products");
        // backend returns { products: [...] }
        const items = (res.data.products || []).map((p: any, i: number) => ({
          id: p._id ?? p.id ?? String(i),
          title: p.title,
          image: p.image ?? null,
          quantity: p.quantity ?? 0,
        }));
        if (!cancelled) setProducts(items);
      } catch (err: any) {
        if (!cancelled) setError(err.message || "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [adminEmail]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Navbar */}
      <nav className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Inventory Dashboard</h1>
          <p className="text-sm text-gray-500">Admin view of products</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/home"
            className="px-3 py-1.5 rounded-md bg-white border border-gray-200 shadow-sm text-sm hover:shadow"
          >
            Home
          </Link>

          <Link
            href="/addNewProduct"
            className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
          >
            Add New Product
          </Link>
        </div>
      </nav>

      {/* Content */}
      <section>
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse p-4 bg-white rounded-2xl border border-gray-100"
              >
                <div className="h-36 bg-gray-200 rounded-md mb-3" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-md">
            Error loading products: {error}
          </div>
        )}

        {!loading && !error && products && products.length === 0 && (
          <div className="text-center text-gray-600 py-20">No products found.</div>
        )}

        {!loading && !error && products && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <article
                key={p.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="h-44 w-full bg-gray-50">
                  {p.image ? (
                    // using plain <img> so it works for any URL without explicit width/height
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-44 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%' y='50%' fill='%239ca3af' font-size='20' font-family='Arial' dominant-baseline='middle' text-anchor='middle'%3EImage not available%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  ) : (
                    <div className="w-full h-44 flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-medium mb-1 truncate">{p.title}</h2>

                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm text-gray-600">Qty: {p.quantity}</div>

                    <div>
                      {p.quantity === 0 ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                          Out of stock
                        </span>
                      ) : p.quantity < 10 ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                          Low stock ({p.quantity})
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          In stock ({p.quantity})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* optional actions row */}
                  <div className="mt-4 flex items-center gap-2">
                    <Link
                      href={`/dashboard/edit/${p.id}`}
                      className="text-sm px-3 py-1 rounded-md border border-gray-200"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      className="text-sm px-3 py-1 rounded-md bg-red-50 text-red-700 border border-red-100"
                      onClick={() => {
                        // Small optimistic UI remove; this only updates UI locally — implement real delete in API
                        if (!confirm(`Delete product \"${p.title}\"?`)) return;
                        setProducts((prev) => prev?.filter((x) => x.id !== p.id) || null);
                        // call delete API in real app
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
