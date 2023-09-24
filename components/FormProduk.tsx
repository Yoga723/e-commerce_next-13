"use client";
import axios from "axios";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import UploadImg from "./UploadImg";
import { FormMethodProps } from "@/types";
import { useRouter } from "next/navigation";
import { Navigation } from ".";

const FormProduk = ({ FormMethod, produkData }: FormMethodProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageData, setImageData] = useState<FormData | null>(null);
  // Contoh Isi dari statenya : File { name: "AlphaCWPlume.jpg", lastModified: 1689848943250, webkitRelativePath: "", size: 1752841, type: "image/jpeg" }
  const router = useRouter();

  useEffect(() => {
    if (produkData) {
      setTitle(produkData.title || "");
      setDescription(produkData.description || "");
      setPrice(produkData.price.toString() || "");
      setImageData(produkData.imgurl || "");
    }
  }, [produkData]);

  // Fungsi untuk membuat Produk baru atau mengedit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Minta request APIna ie make Axios
    let imgurl = [];
    const _id = produkData?._id;

    try {
      alert("Data sedang dikirim, akan segera kembali ke halaman produk!");

      // Jika methodnya POST

      if (imageData != null) {
        const response = await fetch("/api/uploadimages", {
          method: "POST",
          body: imageData,
        });
        // Contoh Isi dari Data : Array [ {…}, {…} ]
        // 0: Object { asset_id: "b0fd964171bc1477f8556451911d3ceb", public_id: "IsomicWater.jpg", version: 1693655795, … }
        // 1: Object { asset_id: "a81c6c6060a6a1c765dc01cb1a5fb2a5", public_id: "KianaMei.png", version: 1693655799, … }
        // length: 2
        const data = await response.json();
        const imageUrls = await data.map((img: any) => img.url);

        imgurl = imageUrls;

        console.log(imgurl); // Array [ "http://res.cloudinary.com/dof4mcurm/image/upload/v1693655795.jpg", "http://res.cloudinary.com/dof4mcurm/image/upload.jpg" ]
      }

      const payload = { title, description, price, imgurl };

      if (FormMethod == "POST") {
        await axios.post("/api/produk", payload);
        console.log("Selesai Upload");
      } else if (FormMethod == "UPDATE") {
        // Jika methodnya UPDATE
        await axios.put("/api/produk", { ...payload, _id });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (
          err.response?.status === 400 &&
          err.response?.data.code === "CATEGORY_ALREADY_EXIST"
        ) {
          console.log("Category exists");
        }
      } else {
        console.log("Unexpected error", err);
      }
    } finally {
      router.push("/produks");
    }
  };

  return (
    <div className="flex h-screen object-contain">
      <Navigation />
      <div className=" w-screen h-full p-3 text-black bg-slate-500">
        <h1 className="font-bold text-xl mb-2">{FormMethod} :</h1>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="produk"
            className="form-produk-title"
          >
            Produk :
          </label>
          <input
            type="text"
            name="produk"
            placeholder="Nama Produk"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            htmlFor="price"
            className="form-produk-title"
          >
            Price (Rp.):
          </label>
          <input
            type="number"
            name="harga"
            placeholder="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label
            htmlFor="description"
            className="form-produk-title"
          >
            Description :
          </label>
          <textarea
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label
            htmlFor=""
            className="form-produk-title"
          >
            Photo :
          </label>
          <UploadImg
            produkData={produkData}
            imageData={imageData}
            setImageData={setImageData}
          />
          <div className="my-4">
            <button
              className="btn-primary-white mr-2"
              type="button"
              onClick={() => {
                router.push("/produks");
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
