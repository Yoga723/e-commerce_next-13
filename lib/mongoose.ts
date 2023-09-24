import mongoose from "mongoose";

let isConnect = false;

// Page untuk connect ke link database di mongoDB
export const mongooseConnect = async () => {
  mongoose.set("strictQuery", true);
  const uri = process.env.MONGODB_URI; // Menghubungkan ke database test0

  if (isConnect) return console.log("Already Connected to MONGO DB");

  if (mongoose.connection.readyState == 1) {
    await mongoose.connection.asPromise();
  } else {
    isConnect = true;
    return await mongoose.connect(uri!);
  }
};
