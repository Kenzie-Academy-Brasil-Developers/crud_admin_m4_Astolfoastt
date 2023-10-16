import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { z } from "zod";
import AppError from "../errors/AppError.errors";

export const checkingTokenValid = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { authorization } = req.headers;

  if (!authorization) throw new AppError("Missing bearer token", 401);

  const token: string = authorization.split(" ")[1];
  const secret = verify(token, process.env.SECRET_KEY!);
  res.locals = { ...res.locals, secret };

  return next();
};

export const checkingPermissionValid = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let { id } = req.params;
  const { sub, admin } = res.locals.secret;

  if (!id) {
    id = req.params.userId;
  }

  if (admin) return next();

  if (id !== sub) throw new AppError("Insufficient permission", 403);

  return next();
};

export const checkingBody =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);

    return next();
};
