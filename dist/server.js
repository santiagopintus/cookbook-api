"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const db_1 = __importDefault(require("./db"));
const schema_1 = __importDefault(require("./graphql/schema"));
const routes_1 = __importDefault(require("./routes"));
const logger = require("morgan");
require("dotenv").config();
const express_openid_connect_1 = require("express-openid-connect");
//Whether or not is production environment
const isProduction = process.env.NODE_ENV === "production";
const app = (0, express_1.default)();
let localPort = 1234;
const port = process.env.PORT || localPort;
app.use(logger("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/* CONFIG AUTH0 */
const baseURL = isProduction ? process.env.BASE_URL : "http://localhost:1234";
const config = {
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: baseURL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
};
app.use((0, express_openid_connect_1.auth)(config));
// Make USER available everywhere
app.use((req, res, next) => {
    res.locals.user = req.oidc.user;
    next();
});
/* Use this routes for the whole API */
app.use("/", routes_1.default);
const server = new apollo_server_express_1.ApolloServer({
    schema: schema_1.default,
    introspection: true,
    plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()], //Enable playground
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.start();
        server.applyMiddleware({ app });
        db_1.default.once("open", () => {
            console.log("Connected to MongoDB");
            app.listen(port, () => {
                console.log(`Server listening on port ${port}`);
            });
        });
        process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("\nClosing server...");
            yield server.stop();
            console.log("Server closed.");
            process.exit(0);
        }));
    }
    catch (error) {
        if (error.code === "EADDRINUSE") {
            console.log(`Port ${port} is already in use, trying another port...`);
            localPort++;
            app.delete;
            app.listen(localPort, () => {
                console.log(`Server listening on port ${localPort}`);
            });
        }
        else {
            console.error("Error starting server:", error);
        }
    }
});
startServer();
//# sourceMappingURL=server.js.map