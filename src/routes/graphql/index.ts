import { Router } from "express";
const router: Router = Router();

//Loads on /graphql route
router.get("/", (rq, rs, next) => {
  //By now lets Apollo default middleware to be called on /graphql route
  next();
});

export default router;
