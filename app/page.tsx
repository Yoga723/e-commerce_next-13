"use client";
import Image from "next/image";
import { Navigation, Pesanan, Settings, Produk } from "@/components";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  if (process.browser) {
    // code is running in a browser environment
    console.log("Kode Page berjalan di environment browser");
  } else {
    console.log("Kode Page berjalan di environment Node JS");
    // code is running in a Node.js environment
  }
  const { data: session } = useSession(); // Sesi akun ke goggle, dll

  if (session) {
    const userIMG = session?.user?.image?.toString();
    const userName = session?.user?.name?.toString();
    return (
      <main className="flex h-full">
        <Navigation />

        <div className="flex flex-grow p-3 rounded-lg bg-slate-200 text-black">
          <p>Hello {userName}!</p>
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
}
