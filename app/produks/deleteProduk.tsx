"use client";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const DeleteProduk = () => {
  const [produkData, setProdukData] = useState({
    _id: "",
    title: "",
    description: "",
    price: 0,
    __v: 0,
  });
  const { _id } = useParams(); // Men dekonstruksi data yang diterima dari Produk => Delete
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/produk");
  };

  const deleteProduk = async () => {
    await axios.delete(`/api/produk?id=${_id}`)
    goBack();
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
    <div>
      <h2>Apa Anda yakin ingin menghapus produk "{produkData.title}" ?</h2>
      <table className="table">
        <tbody className="text-white">
          <tr className="">
            <td className="border-r-2 border-slate-500 p-2">Nama Produk :</td>
            <td className="p-2 text-slate-500 break-words">Produk 1</td>
          </tr>
          <tr className="">
            <td className="border-r-2 border-slate-500 p-2">Harga Produk :</td>
            <td className="p-2 text-slate-500 break-words">50000</td>
          </tr>
          <tr className="">
            <td className="border-r-2 border-slate-500 p-2">
              Deskripsi Produk :
            </td>
            <td className="p-2 text-slate-500 break-words">
              Produk ini bagus bagaikan sebuah mahakarya. Benda ini dibangun
              dengan penuh ketelitian yang memikirkan tentang kenyamanan
              pengguna saat menggunakannya
            </td>
          </tr>
        </tbody>
      </table>
      <div className="p-3">
        <button
          onClick={goBack}
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
  );
};

export default DeleteProduk;
