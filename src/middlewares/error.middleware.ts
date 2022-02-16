import { NextFunction, Request, Response } from "express";
import Error400 from "../errors/Error400";
import Error401 from "../errors/Error401";
import Error404 from "../errors/Error404";

export const globalError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Error400) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  if (err instanceof Error401) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  if (err instanceof Error404) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).json({ error: "Internal server error" });
};
