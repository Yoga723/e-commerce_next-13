"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { UploadImgProps } from "@/types";

const UploadImg = ({ produkData, imageData, setImageData }: UploadImgProps) => {
  const [imagePreview, setImagePreview] = useState<File[]>([]);
  const [imagePreviewLink, setImagePreviewLink] = useState([]); // Link gambar dari cloudinary

  useEffect(() => {
    if (imageData) {
      setImagePreviewLink!(imageData);
    }
  }, [produkData, imageData]);

  // Convert file images jadi formdata dan di masukkan ke imageData
  const uploadImage = async (e: any) => {
    e.preventDefault();
    const files = e.target?.files; // Ngambil value object files yang berasal dari event target. Intina ambil data gambar lah

    if (files && files.length > 0) {
      const imageData = new FormData(); // Convert filena jadi object HTMLFormElement imageData. Alasannya agar mudah di parse saat di bagian backend
      setImagePreview(files);

      for (const file of files) {
        // Memasukkan semua properti dan value dari file kedalam imageData. imageData disini adalah object. Jadi {file: [props gambar/file], file: [...], dst}
        imageData.append("file", file);
      }
      setImageData!(imageData);
    }
  };

  return (
    <div className=" w-full mb-2">
      <label className="relative flex flex-col items-center justify-center w-full h-56 rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 object-contain">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-black">
            <span className="font-semibold">Click untuk upload</span>
          </p>
          <p className="text-xs text-black">PNG atau JPG</p>
        </div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={uploadImage}
          className="hidden"
        />
        {/* Mapping dam preview image yang akan di upload */}
        <div className="absolute flex h-full w-full object-contain items-start justify-start ">
          {imagePreview.length < 1
            ? imagePreviewLink.map((image) => {
                return (
                  <div
                    className="relative w-96 h-full mx-2"
                    key={image}
                  >
                    <Image
                      src={image}
                      alt="images"
                      fill
                      className="object-contain"
                    />
                  </div>
                );
              })
            : Array.from(imagePreview).map((image) => {
              //isi imagePreview jiga kie = FileList [ File ] = 0: File { name: "AplhaCW.jpg", lastModified: 1689848975806, size: 1889575, … }
                const src = URL.createObjectURL(image);
                return (
                  <div
                    className="relative w-96 h-full mx-2"
                    key={image.name}
                  >
                    <Image
                      src={src}
                      alt="images"
                      fill
                      className="object-contain"
                    />
                  </div>
                );
              })}
        </div>
      </label>

      <div className="flex flex-row max-w-md max-h-md relative"></div>
      {produkData?.images == undefined ||
        (!produkData?.images.length && (
          <div>Tidak ada photo untuk produk ini !</div>
        ))}
    </div>
  );
};

export default UploadImg;
