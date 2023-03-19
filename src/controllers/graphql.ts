import { Request, Response, NextFunction } from "express";

export const loadPlayground = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /* Checks if there's an existing user */
  if (res.locals.user) {
    next();
  }
};
