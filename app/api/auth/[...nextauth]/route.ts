import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";


// Mengharuskan login terlebih dahulu ke google dan mengirim data akun yang digunakan untuk login ke database mongoBD
const handler = NextAuth({
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  // adapter: MongoDBAdapter(clientPromise),
});

export { handler as GET, handler as POST };
