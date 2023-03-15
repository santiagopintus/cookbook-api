import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import db from "./db";
import schema from "./graphql/schema";
import routes from "./routes";
const logger = require("morgan");
require("dotenv").config();
import { auth } from "express-openid-connect";
//Whether or not is production environment
const isProduction = process.env.NODE_ENV === "production";

const app = express();
let localPort: number = 1234;
const port = process.env.PORT || localPort;

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

/* CONFIG AUTH0 */
const baseURL = isProduction
  ? process.env.BASE_URL
  : `http://localhost:${port}`;

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL,
};

app.use(auth(config));
// Make USER available everywhere
app.use((req, res, next) => {
  res.locals.user = req.oidc.user;
  next();
});

/* Use this routes for the whole API */
app.use("/", routes);

const server = new ApolloServer({
  schema,
  introspection: true, // enable introspection for testing
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], //Enable playground
});

const startServer = async () => {
  try {
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
  } catch (error) {
    if (error.code === "EADDRINUSE") {
      console.log(`Port ${port} is already in use, trying another port...`);
      localPort++;
      app.delete;
      app.listen(localPort, () => {
        console.log(`Server listening on port ${localPort}`);
      });
    } else {
      console.error("Error starting server:", error);
    }
  }
};

startServer();
