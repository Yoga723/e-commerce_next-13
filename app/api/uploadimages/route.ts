import { mongooseConnect } from "@/lib/mongoose";
import { Produk } from "@/models/Produk";
import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const config = {
  api: { bodyParser: false },
};
export const runtime = 'edge'
// 'edge' | 'nodejs'
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
  secure: true,
});
// Fungsi asinkron untuk menangani permintaan POST
export async function POST(req: NextRequest, res) {
  // Ambil data form dari request UploadImg.tsx
  const formData = await req.formData();

  // Ambil semua berkas dari formData dengan key "file"
  // contoh : File { name: "AlphaCWPlume.jpg", type: "image/jpeg" }
  const files: File[] | null = formData.getAll("file") as unknown as File[];

  // Jika berkas tidak ada, kembalikan respons dengan kesalahan
  if (!files) {
    return NextResponse.json({ success: false, message: "No file uploaded!" });
  }

  const cloudinaryProps = [];

  for (const file of files) {
    // Mengkonversi berkas menjadi format ArrayBuffer/biner
    const bytes = await file.arrayBuffer();

    // Konversi ArrayBuffer ke Base64 untuk upload ke Cloudinary
    const base64Image = Buffer.from(bytes).toString("base64");
    const encodedImage = `data:image/jpeg;base64,${base64Image}`;

    // Upload gambar ke Cloudinary
    const photoURL = await cloudinary.uploader.upload(encodedImage, {
      public_id: file.name,
    });
    cloudinaryProps.push(photoURL);

    console.log("Upload Image Berhasil", file.name);
  }

  return NextResponse.json(cloudinaryProps);
}
