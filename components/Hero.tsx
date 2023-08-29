"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRoutes } from "react-router-dom";
import { Navigation, Dashboard, Pesanan, Settings, Produk } from "@/components";

import { New, DeleteProduk, EditProduk } from "../app/produks";
import { BrowserRouter, HashRouter } from "react-router-dom";

const Hero = () => {
  const { data: session } = useSession(); // Sesi akun ke goggle, dll
  const router = useRoutes([
    { path: "/", element: <Dashboard /> },
    { path: "/pesanan", element: <Pesanan /> },
    { path: "/produk", element: <Produk /> },
    { path: "/settings", element: <Settings /> },
    { path: "/produk/new", element: <New /> },
    { path: "/produk/edit/:_id", element: <EditProduk /> },
    { path: "/produk/delete/:_id", element: <DeleteProduk /> },
  ]);

  if (session) {
    const userIMG = session?.user?.image?.toString();
    const userName = session?.user?.name?.toString();
    return (
        <main className="flex h-full">
          <Navigation
            userIMG={userIMG}
            userName={userName}
          />

          {/* Main Content didie kuduna isi dashboard, setting, dll*/}
          <div className="flex flex-grow p-3 rounded-lg bg-slate-200 text-black">
            {router || "No Matched Route"}
          </div>
        </main>
    );
  } else {
    return (
        <div className="flex h-full items-center justify-center">
          <button
            type="button"
            className="bg-white p-2 px-4 text-black font-semibold rounded-md"
            onClick={() => signIn("google")}
          >
            Sign In With Google
          </button>
          <button
            type="button"
            className="bg-white p-2 px-4 text-black font-semibold rounded-md"
            onClick={() => signOut()}
          >
            Log Out
          </button>
        </div>
    );
  }
};

export default Hero;
