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
  const [imgurl, setImgurl] = useState("");
  const [imageData, setImageData] = useState<FormData | null>(null);
  // Contoh Isi dari statenya : File { name: "AlphaCWPlume.jpg", lastModified: 1689848943250, webkitRelativePath: "", size: 1752841, type: "image/jpeg" }
  const router = useRouter();

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
    const data = { title, description, price, imgurl };
    const _id = produkData?._id;

    try {
      alert("Data sedang dikirim, akan segera kembali ke halaman produk!");

      if (FormMethod == "POST") {
        // Jika methodnya POST

        if (imageData != null) {
          const uploadImage = await fetch("/api/uploadimages", {
            method: "POST",
            body: imageData,
          }).then((res) => setImgurl(res.url));

          const props = { uploadImage }; // Props.uploadImage = array []
          console.log(props.uploadImage);
        }
        await axios.post("/api/produk", data);
        console.log("Selesai Upload");
      } else if (FormMethod == "UPDATE") {
        // Jika methodnya UPDATE
        await axios.put("/api/produk", { ...data, _id });
        console.log("Ini Akan mengupdate Data");
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
    <div className="flex w-auto h-screen object-contain">
      <Navigation />
      <div className="w-screen h-full p-2 text-black bg-slate-500">
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
