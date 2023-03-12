import { Router, Request, Response } from "express";
import graphqlRouter from "./graphql";
import serveHome from "../controllers";
const router: Router = Router();

router.get("/", serveHome);
router.use("/graphql", graphqlRouter);

export default router;
