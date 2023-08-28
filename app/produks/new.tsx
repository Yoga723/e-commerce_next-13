"use client";
import FormProduk from "@/components/FormProduk";
import React, { useState } from "react";

const New = () => {
  return (
    <div className="w-full">
      <FormProduk FormMethod={"POST"}/>
    </div>
  );
};

export default New;
