import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import db from "./db";
import schema from "./graphql/schema";
import routes from "./routes";

const app = express();
const port = process.env.PORT || 1234;

app.use(cors());
app.use(express.json());
app.use("/", routes);

const server = new ApolloServer({
  schema,
  introspection: true, // enable introspection for testing
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], //Enable playground
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  });

  process.on("SIGINT", async () => {
    console.log("\nClosing server...");
    await server.stop();
    console.log("Server closed.");
    process.exit(0);
  });
};

startServer();
