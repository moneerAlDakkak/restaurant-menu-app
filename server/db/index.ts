import mongoose from "mongoose";

export default async function connectToDb() {
  let connection;
  try {
    connection = await mongoose.connect(useRuntimeConfig().mongoString);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  } finally {
    return connection;
  }
}
