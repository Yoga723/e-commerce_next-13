"use client";
import { ProdukProps } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader } from ".";

const Produk = () => {
  const [daftarProduk, setDaftarProduk] = useState<ProdukProps[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/api/produk").then((res) => {
      setLoading(false);
      setDaftarProduk(res.data);
    });
  }, []);

  return (
    <div className="h-full w-full relative overflow-scroll object-contain">
      <table className="table">
        <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="items-start ">
            <th className="px-2">Nama Produk</th>
            <th className="px-2">Harga</th>
            <th className="px-2">Deskripsi</th>
            <th className="px-2">Aksi</th>
          </tr>
        </thead>
        {loading ? (
          <>
            <tbody>
              <tr className="absolute items-center top-1/2 left-1/2 justify-center z-10">
                <td className="fixed inset-0 bg-black bg-opacity-25" />
                <Loader />
              </tr>
            </tbody>
          </>
        ) : (
          <>
            <tbody className="w-full">
              {daftarProduk.map((produk) => (
                <tr className=" py-3" key={produk._id}>
                  <td className="table-content text-white border-r-2">
                    {produk.title}
                  </td>
                  <td className="table-content text-slate-500 border-r-2">
                    Rp. {produk.price.toString()}
                  </td>
                  <td className="table-content text-slate-500 border-r-2 ">
                    {produk.description}
                  </td>
                  <td>
                    <Image src={produk.imgurl} alt={produk.title}/>
                  </td>
                  <td className="flex w-full items-center justify-center px-3 py-2 border-b border-gray-700  ">
                    <Link
                      href={`/produks/edit/${produk._id}`}
                      className="relative inline-block text-lg group"
                    >
                      <span className="relative z-10 block px-5 py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                        <span className="absolute inset-0 w-full h-full px-5 py-2 rounded-lg bg-gray-50"></span>
                        <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                        <span className="relative">Edit</span>
                      </span>
                    </Link>
                    <Link
                      href={`/produks/delete/${produk._id}`}
                      className="relative inline-block text-lg group ml-3"
                    >
                      <span className="relative z-10 block px-5 py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                        <span className="absolute inset-0 w-full h-full px-5 py-2 rounded-lg bg-red-700"></span>
                        <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                        <span className="relative">Delete</span>
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
      <Link
        href={`/produks/new`}
        className="absolute right-5 bg-black text-white py-1 px-2 rounded-lg"
      >
        Tambah produk baru
      </Link>
    </div>
  );
};

export default Produk;
