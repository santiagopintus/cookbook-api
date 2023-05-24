import { Request, Response, NextFunction, Router } from "express";
import { requiresAuth } from "express-openid-connect";
const router: Router = Router();

import { loadPlayground } from "../../controllers/graphql";

router.get("/", requiresAuth(), loadPlayground);

export default router;
