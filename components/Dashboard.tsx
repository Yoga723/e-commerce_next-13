import React from "react";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();
  return <div className="">Halo, Selamat datang {session?.user?.name}</div>;
};

export default Dashboard;
