import mongoose from "mongoose";

// Page untuk connect ke link database di mongoDB
export const mongooseConnect = () => {
  const uri = process.env.MONGODB_URI;  // Menghubungkan ke database test0

  if (mongoose.connection.readyState == 1) {
    mongoose.connection.asPromise();
  } else {
    return mongoose.connect(uri!);
  }
};
