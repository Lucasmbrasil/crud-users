import { NextFunction, Request, Response } from "express";
import {
  createUser,
  deleteUser,
  findByCEP,
  findByCPF,
  listUsers,
  loginUser,
  updateUser,
} from "../services/user.service";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const users = await listUsers();
  res.send(users);
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req.body);
    res.send(user);
  } catch (error: any) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenId = req.user!.id;

  try {
    const updatedUser = await updateUser(tokenId, req.body);
    res.send(updatedUser);
  } catch (error: any) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cpf } = req.body;
  try {
    const token = await loginUser(cpf);
    res.send(token);
  } catch (error) {
    next(error);
  }
};

export const deleting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenId = req.user!.id;

  try {
    await deleteUser(tokenId);
    res.sendStatus(204);
  } catch (error: any) {
    next(error);
  }
};
export const getByCPF = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cpf } = req.params;

  try {
    const user = await findByCPF(cpf);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const getByCEP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cep } = req.params;

  try {
    const user = await findByCEP(cep);
    res.send(user);
  } catch (error) {
    next(error);
  }
};
