import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import Error401 from "../errors/Error401";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  jwt.verify(
    token as string,
    process.env.SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        return next(new Error401(err.message));
      }
      const userId = decoded.id;
      req.user = { id: userId };

      next();
    }
  );
};
