import { Request, Response } from "express";
import {
  createCourseService,
  getCoursesService,
  getCourseByUserService,
  deleteUserCourseService,
  creatUserCourseService,
} from "../services/courses.services";

export const createCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const course = await createCourseService(req.body);

  return res.status(201).json(course);
};

export const getCoursesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const course = await getCoursesService();

  return res.status(200).json(course);
};

export const creatUserCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { courseId, userId } = req.params;
  await creatUserCourseService(Number(userId), Number(courseId));

  return res
    .status(201)
    .json({ message: "User successfully vinculed to course" });
};

export const deleteUserCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { courseId, userId } = req.params;
  await deleteUserCourseService(Number(userId), Number(courseId));

  return res.status(204).json();
};

export const getCourseByUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const user = await getCourseByUserService(Number(id));

  return res.status(200).json(user);
};
