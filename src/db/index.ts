import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not set.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI as string)
  .catch((err) => console.log(err));

// Export the Mongoose connection object
export default mongoose.connection;
