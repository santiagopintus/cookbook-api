import { Router, Request, Response } from "express";
import graphqlRouter from "./graphql";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send('<a href="/graphql">See API Docs</a>');
});
router.use("/graphql", graphqlRouter);

export default router;
