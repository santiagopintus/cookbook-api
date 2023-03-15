"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const graphql_1 = __importDefault(require("./graphql"));
const controllers_1 = __importDefault(require("../controllers"));
const express_openid_connect_1 = require("express-openid-connect");
// import { handle404 } from "../controllers/error";
const router = (0, express_1.Router)();
router.get("/", controllers_1.default);
router.use("/graphql", (0, express_openid_connect_1.requiresAuth)(), graphql_1.default);
// Catch 404 and forward to error handler
// router.use((req, res, next) => {
//   const err = new HttpError("Not Found", 404);
//   res.send(err);
// });
exports.default = router;
//# sourceMappingURL=index.js.map