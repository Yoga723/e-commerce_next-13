import { mongooseConnect } from "@/lib/mongoose";
import { Produk } from "@/models/Produk";
import { NextResponse, NextRequest } from "next/server";
import { AxiosError } from "axios";

export const POST = async (req: any, res: any) => {
  const { title, description, price, images } = await req.json(); // Dekonstruksikan data yang dikirim dari new
  mongooseConnect();

  let produkData: any = {
    title,
    description,
    price,
  };

  // Tambah key/property images jika ada
  if (images && images.length > 0) {
    produkData.images = images;
  }

  if (price.length < 1) {
    produkData.price = 0;
  }

  try {
    const sendData = await Produk.create(produkData);
    console.log("POST REQUEST DONE");
    return NextResponse.json(sendData);
  } catch (error: any) {
    console.error("Error saving to database:", error.message);
    return NextResponse.json({ success: false, message: error.message });
  }
};

export const PUT = async (req: any, res: any) => {
  mongooseConnect();
  const { title, description, price, images, _id } = await req.json(); // Dekonstruksikan data yang dikirim dari new

  let updateProdukData: any = {
    title: title,
    description: description,
    price: price,
  };

  // Tambah key/property images jika ada
  if (images && images.length > 0) {
    updateProdukData.images = images;
  }

  if (price.length < 1) {
    updateProdukData.price = 0;
  }

  try {
    const sendData = await Produk.updateOne({ _id: _id }, updateProdukData);

    return NextResponse.json(sendData); // Responsena teh jang nga bejaan axios.put() bahwa data ges ka kirim
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
