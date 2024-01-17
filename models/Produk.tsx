import mongoose, { Schema, model } from "mongoose";

// Page ini merupakan skema untuk model dari database Produk. Di mongodb terletak di database test0 -> collection produks. Nama modelna diubah jadi lowercase dari Produk menjadi produks
const produkSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
});

export const Produk = mongoose.models.Produk || model("Produk", produkSchema);
