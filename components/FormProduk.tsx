"use client";
import axios from "axios";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import UploadImg from "./UploadImg";
import { FormMethodProps } from "@/types";
import { useRouter } from "next/navigation";
import { Loader, Navigation } from ".";

const FormProduk = ({ FormMethod, produkData }: FormMethodProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imagesLink, setImagesLink] = useState<string[]>([]); // Link ini hanya untuk preview aja di input images
  const [upstatus, setUpstatus] = useState(false);
  const [imageData, setImageData] = useState<FormData | null>(null);
  // Contoh Isi dari state imageData : FormData { file { name: "AlphaCWPlume.jpg", lastModified: 1689848943250, webkitRelativePath: "", size: 1752841, type: "image/jpeg" } }
  const router = useRouter();

  useEffect(() => {
    if (produkData) {
      setTitle(produkData.title || "");
      setDescription(produkData.description || "");
      setPrice(produkData.price.toString() || "");
      setImagesLink(produkData.images || "");
    }
  }, [produkData]);

  // Fungsi untuk membuat Produk baru atau mengedit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Minta request APIna ie make Axios
    let images = [];
    const _id = produkData?._id;

    try {
      // Jika methodnya POST
      alert("Data sedang dikirim, akan segera kembali ke halaman produk!");
      setUpstatus(true);

      // Upload Gambar - gambar jika ada
      if (imageData != null) {
        console.log("ini adalah imageData:", imageData);
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

        images = imageUrls;
      }

      // Edit payload imagesna meh men kosong di skip, ie men kosong bakal di replace data dina mongodbna
      const payload = { title, description, price, images };

      if (FormMethod == "POST") {
        await axios.post("/api/produk", payload);
        console.log("Selesai Upload");
      } else if (FormMethod == "UPDATE") {
        // Jika methodnya UPDATE
        await axios.put("/api/produk", { ...payload, _id });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          console.log("Category exists");
        }
      } else {
        console.log("Unexpected error", err);
      }
    } finally {
      setUpstatus(false);
      router.push("/produks");
    }
  };

  return (
    <section className="flex h-screen object-contain">
      {upstatus ? (
        <div className="flex absolute z-10 items-center justify-center w-full h-full bg-opacity-40 bg-gray-400">
          <Loader />
        </div>
      ) : (
        ""
      )}
      <div>
        <Navigation />
      </div>
      <div className="w-screen h-full p-3 text-black bg-slate-500">
        <h1 className="font-bold text-xl mb-2">
          {FormMethod == "POST" ? "Tambah Produk" : "Edit Produk"} :
        </h1>
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
            Price Rp.(123456789):
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
            className=""
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label
            htmlFor=""
            className="form-produk-title"
          >
            Photo :
          </label>
          <h2 className="text-red-400 text-base">
            Bila ingin menambahkan photo baru, masukkan juga photo sebelumnya
            untuk di upload !
          </h2>
          <UploadImg
            produkData={produkData}
            imagesLink={imagesLink}
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
    </section>
  );
};

export default FormProduk;
