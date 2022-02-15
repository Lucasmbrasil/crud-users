import { NextFunction, Request, Response } from "express";
import { createUser, listUsers } from "../services/user.service";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const users = await listUsers();
  res.send(users);
};

export const create = async (req: Request, res: Response) => {
  const user = await createUser(req.body);

  res.send(user);
};
