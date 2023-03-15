import { Router, Request, Response } from "express";
import graphqlRouter from "./graphql";
import serveHome from "../controllers";
import { HttpError } from "../validation/HttpError";
import { requiresAuth } from "express-openid-connect";

// import { handle404 } from "../controllers/error";
const router: Router = Router();

router.get("/", serveHome);
router.use("/graphql", requiresAuth(), graphqlRouter);

// Catch 404 and forward to error handler
// router.use((req, res, next) => {
//   const err = new HttpError("Not Found", 404);
//   res.send(err);
// });

export default router;
