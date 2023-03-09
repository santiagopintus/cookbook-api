import { Router, Request, Response } from "express";
import graphqlRouter from "./graphql";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("HOME");
});
router.use("/graphql", graphqlRouter);

export default router;
