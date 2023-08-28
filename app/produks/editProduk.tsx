"use client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import FormProduk from "@/components/FormProduk";
import { ProdukProps } from "@/types";

const EditProduk = () => {
  const { _id } = useParams(); // Men dekonstruksi data yang diterima dari Produk => Edit
  const [produkData, setProdukData] = useState<ProdukProps>({
    _id: "",
    title: "",
    description: "",
    price: 0,
    images: undefined,
    __v: 0,
  });

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
    <div className="w-full object-contain overflow-y-auto">
      {produkData && (
        <>
          <h1 className="mb-2 text-xl">
            Edit Produk : <span className="font-bold">{produkData.title}</span>
          </h1>
          <FormProduk
            FormMethod={"UPDATE"}
            produkData={produkData}
          />
        </>
      )}
    </div>
  );
};

export default EditProduk;
