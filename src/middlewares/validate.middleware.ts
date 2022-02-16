import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import Error400 from "../errors/Error400";

export const validate =
  (schema: yup.AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
      await schema.validate(body, { abortEarly: false, stripUnknown: true });
      next();
    } catch (error: any) {
      next(new Error400(error.errors[0]));
    }
  };
