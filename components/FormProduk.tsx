"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadImg from "./UploadImg";
import { FormMethodProps } from "@/types";

const FormProduk = ({ FormMethod, produkData }: FormMethodProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (produkData) {
      setTitle(produkData.title || "");
      setDescription(produkData.description || "");
      setPrice(produkData.price.toString() || "");
    }
  }, [produkData]);

  // Fungsi untuk membuat Produk baru atau mengedit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Minta request APIna ie make Axios
    const data = { title, description, price };
    const _id = produkData?._id;

    try {
      alert("Data sedang dikirim, akan segera kembali ke halaman produk!");

      if (FormMethod == "POST") {
        // Jika methodnya POST
        await axios.post("/api/produk", data);
      } else if (FormMethod == "UPDATE") {
        // Jika methodnya UPDATE
        await axios.put("/api/produk", { ...data, _id });
        console.log("Ini Akan mengupdate Data");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code outside of the 2xx range
        console.log(error.response.data);
        console.log(error.response.status);
      }
    } finally {
      navigate("/produk");
    }
  };

  return (
    <div className="w-full h-full overflow-y-scroll object-contain">
      <div className="max-w-5xl">
        <form onSubmit={handleSubmit}>
          <label htmlFor="produk" className="form-produk-title">Produk :</label>
          <input
            type="text"
            name="produk"
            placeholder="Nama Produk"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="price" className="form-produk-title">Price (Rp.):</label>
          <input
            type="number"
            name="harga"
            placeholder="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="description" className="form-produk-title">Description :</label>
          <textarea
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label htmlFor="" className="form-produk-title">Photo :</label>
          <UploadImg produkData={produkData} />
          <div className="my-4">
            <button
              className="btn-primary-white mr-2"
              type="button"
              onClick={() => {
                navigate("/produk");
              }}
            >
              Kembali
            </button>
            <button
              className="btn-primary-black mr-2"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormProduk;
