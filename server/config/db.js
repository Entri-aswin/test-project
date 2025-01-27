import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`connected to database ===== ${process.env.MONGODB_URI}`);

  } catch (error) {
    console.log(error);
  }
};
