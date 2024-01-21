"use client";
import { ProdukProps } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader } from ".";
import Image from "next/image";

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
    <section className="h-full w-full overflow-scroll object-contain">
      <div className="mr-5">
        <Link
          href={`/produks/new`}
          className="float-right font-bold font-serif py-1 px-2 my-2 rounded-lg inline-block group"
        >
          <span className="relative z-10 block px-5 py-2 overflow-hidden leading-tight text-white transition-colors duration-300 ease-out  rounded-lg ">
            <span className="absolute inset-0 w-full h-full px-5 py-2 rounded-lg bg-green-600"></span>
            <span className="absolute left-0 w-56 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-blue-400 group-hover:-rotate-180 ease"></span>
            <span className="relative">Tambah Produk baru</span>
          </span>
        </Link>
      </div>
      <table className="table w-full h-full">
        <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="items-start ">
            <th className="px-2">Nama Produk</th>
            <th className="px-2">Harga</th>
            <th className="px-2">Deskripsi</th>
            <th className="px-2">Gambar</th>
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
            <tbody className="w-full flex-wrap">
              {daftarProduk.map((produk) => {
                const addPriceDot = () => {
                  return produk.price
                    ?.toString()
                    .match(/.{1,3}/g)
                    .join(".");
                };
                return (
                  <tr
                    className=" odd:bg-gray-900 even:bg-black py-3"
                    key={produk._id}
                  >
                    <td className="table-content text-white border-r-2">
                      {produk.title}
                    </td>
                    {/* Harga */}
                    <td className="table-content text-slate-500 border-r-2">
                      Rp. {addPriceDot()}
                    </td>
                    {/* Deskripsi */}
                    <td className="table-content text-slate-500 border-r-2 ">
                      {produk.description}
                    </td>
                    {/* Gambar */}
                    <td className="table-content text-white border-b border-r-2 border-gray-700 object-contain">
                      <div className=" max-w-full h-auto items-center justify-center gap-3">
                        {produk.images.map((url: string) => {
                          return (
                            <div
                              key={url}
                              className="my-3 relative w-full h-[20vh]"
                            >
                              {url ? (
                                <Image
                                  src={url}
                                  alt={produk.title}
                                  fill
                                  // width={200}
                                  // height={200}
                                  // className="w-52 h-52"
                                  key={produk.images}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    {/* Actions */}
                    <td className="px-3 py-2 border-b border-gray-700">
                      <div className="flex h-full w-full items-center justify-center">
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
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </>
        )}
      </table>
    </section>
  );
};

export default Produk;
