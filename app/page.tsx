
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRoutes } from "react-router-dom";
import {
  Navigation,
  Dashboard,
  Pesanan,
  Settings,
  Produk,
  Hero,
  Test,
} from "@/components";
import { New, DeleteProduk, EditProduk } from "./produks";
import { BrowserRouter, HashRouter } from "react-router-dom";

export default function Home() {
  return (
    <Test />
  );
}
