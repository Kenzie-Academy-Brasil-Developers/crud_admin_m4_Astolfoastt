import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../errors/AppError.errors";
import { TCourseResult } from "../interfaces/courses.interface";

export const checkingCourseValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { courseId } = req.params;
  const queryResult: TCourseResult = await client.query(
    'SELECT * FROM "courses" WHERE "id" = $1;',
    [courseId]
  );

  if (!queryResult.rowCount) throw new AppError("User/course not found", 404);

  return next();
};

export const checkingUserCoursesValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;
  const queryResult: TCourseResult = await client.query(
    'SELECT * FROM "users" WHERE "id" = $1;',
    [userId]
  );

  if (!queryResult.rowCount) throw new AppError("User/course not found", 404);

  return next();
};

export const checkingPermissionUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { admin } = res.locals.secret;

  if (!admin) throw new AppError("Insufficient permission", 403);

  return next();
};
