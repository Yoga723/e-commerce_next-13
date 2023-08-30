import { mongooseConnect } from "@/lib/mongoose";
import { Produk } from "@/models/Produk";
import { NextResponse, NextRequest } from "next/server";
import { AxiosError } from "axios";

export const POST = async (req: any, res: any) => {
  const { title, description, price } = await req.json(); // Dekonstruksikan data yang dikirim dari new
  mongooseConnect();

  const produkData = await Produk.create({
    title,
    description,
    price,
  });

  console.log("POST REQUEST DONE");
  return NextResponse.json(produkData);
};

export const PUT = async (req: any, res: any) => {
  mongooseConnect();
  const { title, description, price, _id } = await req.json(); // Dekonstruksikan data yang dikirim dari new
  await Produk.updateOne(
    { _id: _id },
    { title: title, description: description, price: price }
  );
  return NextResponse.json(true); // Responsena teh jang nga bejaan axios.put() bahwa data ges ka kirim
};

export const DELETE = async (req: any, res: any) => {
  mongooseConnect();
  const id = req.nextUrl.searchParams.get("id");
  try {
    await Produk.deleteOne({ _id: id });
    return NextResponse.json(true);
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
  }
};

export const GET = async (req: any, res: any) => {
  mongooseConnect();
  console.log("INI METHOD GET");
  // Mengambil value dari Parameter search atau setelah ?. Misal ?id=12&price=1222 Maka {id:12, price: 1222}
  const getProduk = req.nextUrl.searchParams;
  try {
    if (getProduk != "") {
      // Mencari satu data dari database MongoDB dengan _id yaitu sama dengan id dari parameter
      const datas = await Produk.findOne({ _id: getProduk.get("id") });
      return NextResponse.json(datas);
    } else {
      const datas = await Produk.find({});

      return NextResponse.json(datas);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    // res.status(500).json({ message: "Internal Server Error" });
  }
};
