import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../errors/AppError.errors";
import { TUserResult } from "../interfaces/user.interface";

export const checkingEmailValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  const queryResult: TUserResult = await client.query(
    'SELECT * FROM "users" WHERE "email" = $1;',
    [email]
  );

  if (queryResult.rowCount) throw new AppError("Email already registered", 409);

  return next();
};
