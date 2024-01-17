import { mongooseConnect } from "@/lib/mongoose";
import { Produk } from "@/models/Produk";
import { NextResponse, NextRequest } from "next/server";
import { AxiosError } from "axios";

export const POST = async (req: any, res: any) => {
  const { title, description, price, images } = await req.json(); // Dekonstruksikan data yang dikirim dari new
  mongooseConnect();

  try {
    const produkData = await Produk.create({
      title,
      description,
      price,
      images,
    });
    console.log("POST REQUEST DONE");
    return NextResponse.json(produkData);
  } catch (error: any) {
    console.error("Error saving to database:", error.message);
    return NextResponse.json({ success: false, message: error.message });
  }
};

export const PUT = async (req: any, res: any) => {
  mongooseConnect();
  const { title, description, price, images, _id } = await req.json(); // Dekonstruksikan data yang dikirim dari new

  try {
    const updatedProdukData = await Produk.updateOne(
      { _id: _id },
      { title: title, description: description, price: price, images: images }
    );

    return NextResponse.json(updatedProdukData); // Responsena teh jang nga bejaan axios.put() bahwa data ges ka kirim
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
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
  }
};
