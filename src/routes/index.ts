import { Router, Request, Response } from "express";
import graphqlRouter from "./graphql";
import homeController from "../controllers";
const router: Router = Router();

router.get("/", homeController);
router.use("/graphql", graphqlRouter);

export default router;
