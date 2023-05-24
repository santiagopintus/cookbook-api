import { Router } from "express";
import graphqlRouter from "./graphql";
import serveHome from "../controllers";

const router: Router = Router();

router.get("/", serveHome);
// router.use("/graphql", graphqlRouter); //Let Apollo Handle this route (Publicly)

export default router;
