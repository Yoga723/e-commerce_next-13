import Image from "next/image";
import { Navigation,Produk } from "@/components";

export default function Produks() {
  if (process.browser) {
    // code is running in a browser environment
    console.log("Kode Page berjalan di environment browser");
  } else {
    console.log("Kode Page berjalan di environment Node JS");
    // code is running in a Node.js environment
  }

  return (
    <main className="flex h-full">
      <Navigation />

      <div className="flex flex-grow p-3 rounded-lg bg-slate-200 text-black">
        <Produk />
      </div>
    </main>
  );
}
