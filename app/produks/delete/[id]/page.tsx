"use client";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components";

const DeleteProduk = ({ params }: { params: { id: string } }) => {
  const [produkData, setProdukData] = useState({
    _id: ``,
    title: ``,
    description: ``,
    price: 0,
    __v: 0,
  });
  const router = useRouter();
  const _id = params.id; // Men dekonstruksi data yang diterima dari Produk => Delete

  const deleteProduk = async () => {
    await axios.delete(`/api/produk?id=${_id}`);
    router.push("/produks");
  };

  useEffect(() => {
    if (!_id) {
      return;
    }
    // Mengirim method GET ke /api/produk dengan tambahan parameter ?id=_id
    axios.get(`/api/produk?id=${_id}`).then((res) => {
      setProdukData(res.data);
      console.log(res.data);
    });
  }, [_id]);

  return (
    <div className="flex w-auto h-screen object-contain">
      <Navigation />
      <div className="w-screen h-full p-2 text-black bg-slate-300">
        <h2>Apa Anda yakin ingin menghapus produk `{produkData.title}` ?</h2>
        <table className="table ">
          <tbody className="text-white ">
            <tr className="odd:bg-gray-900 even:bg-black py-3">
              <td className="border-r-2 border-slate-500 p-2">Nama Produk :</td>
              <td className="p-2 text-slate-500 break-words">
                {produkData.title}
              </td>
            </tr>
            <tr className="odd:bg-gray-900 even:bg-black py-3">
              <td className="border-r-2 border-slate-500 p-2">
                Harga Produk :
              </td>
              <td className="p-2 text-slate-500 break-words">
                {produkData.price}
              </td>
            </tr>
            <tr className="odd:bg-gray-900 even:bg-black py-3">
              <td className="border-r-2 border-slate-500 p-2">
                Deskripsi Produk :
              </td>
              <td className="p-2 text-slate-500 break-words">
                {produkData.description}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="p-3">
          <button
            onClick={() => router.push("/produks")}
            className="relative inline-block text-lg group ml-3"
          >
            <span className="relative z-10 block px-5 py-2 overflow-hidden font-medium leading-tight text-white transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-black">
              <span className="absolute inset-0 w-full h-full px-5 py-2 rounded-lg bg-black"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-white group-hover:-rotate-180 ease"></span>
              <span className="relative">Tidak</span>
            </span>
          </button>
          <button
            onClick={deleteProduk}
            className="relative inline-block text-lg group ml-3"
          >
            <span className="relative z-10 block px-5 py-2 overflow-hidden font-medium leading-tight text-white transition-colors duration-300 ease-out border-2 border-red-700 rounded-lg group-hover:text-black">
              <span className="absolute inset-0 w-full h-full px-5 py-2 rounded-lg bg-red-700"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-white group-hover:-rotate-180 ease"></span>
              <span className="relative">Ya</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduk;
