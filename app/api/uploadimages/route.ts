import { mongooseConnect } from "@/lib/mongoose";
import { Produk } from "@/models/Produk";
import { NextResponse, NextRequest } from "next/server";
import { join, resolve } from "path";
import { writeFile } from "fs/promises";

export const config = {
  api: { bodyParser: false },
};

// Fungsi asinkron untuk menangani permintaan POST
export async function POST(req: NextRequest, res) {
  // Mendapatkan data form dari permintaan yang masuk dari UploadImg.tsx
  const formData = await req.formData();

  // Mengambil berkas dari formData. Jika tidak ada, nilainya akan null
  const file: File | null = formData.get("file") as unknown as File;  // formData.get('file) teh ngambil key 'file' dan value dari formDatana

  // Mengambil direktori saat ini dari proyek yang sedang berjalan
  const cwd = process.cwd();
  console.log(formData.get('file'))

  // Jika berkas tidak ada, kembalikan respons dengan kesalahan
  if (!file) {
    return NextResponse.json({ success: false, message: "No file uploaded!" });
  }

  // Mengkonversi berkas menjadi ArrayBuffer/biner
  const bytes = await file.arrayBuffer();

  // Mengkonversi ArrayBuffer menjadi Buffer
  const buffer = Buffer.from(bytes);

  // Menentukan lokasi penyimpanan berkas di sistem, yaitu di direktori tmp
  const path = join(cwd, "tmp", file.name);

  // Menulis berkas ke lokasi yang ditentukan
  const resultImage = await writeFile(path, buffer);

  // Mengembalikan respons sukses
  return NextResponse.json("Ok");
}
