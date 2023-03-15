import mongoose from "mongoose";
require("dotenv").config();

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not set.");
  process.exit(1);
}

// Queries with fields not defined in the schema will be rejected.
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGODB_URI as string)
  .catch((err) => console.log(err));

// Export the Mongoose connection object
export default mongoose.connection;
