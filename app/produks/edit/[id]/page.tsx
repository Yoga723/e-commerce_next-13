"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import FormProduk from "@/components/FormProduk";
import { ProdukProps } from "@/types";

const EditProduk = ({ params }: { params: { id: string } }) => {
  const _id = params.id;
  const [produkData, setProdukData] = useState<ProdukProps>({
    _id: "",
    title: "",
    description: "",
    price: 0,
    imgurl: undefined,
    __v: 0,
  });

  useEffect(() => {
    if (!_id) {
      return;
    }
    // Mengirim method GET ke /api/produk dengan tambahan parameter ?id=_id
    axios.get(`/api/produk?id=${_id}`).then((res) => {
      setProdukData(res.data);
    });
  }, [_id]);

  return (
    <div className="w-full object-contain overflow-y-auto">
      {produkData && (
        <>
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
