import { Request, Response } from "express";
import {
  createUserService,
  userLoginService,
  getUserService,
  getUserCoursesService,
} from "../services/user.services";

export const createUserContoller = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await createUserService(req.body);

  return res.status(201).json(user);
};

export const userLoginContoller = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await userLoginService(req.body);

  return res.status(200).json(user);
};

export const getUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await getUserService();

  return res.status(200).json(user);
};

export const getUserCoursesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const course = await getUserCoursesService(Number(id));

  return res.status(200).json(course);
};

