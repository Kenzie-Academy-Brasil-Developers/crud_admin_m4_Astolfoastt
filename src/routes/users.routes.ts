import { userCreateSchema } from "../schemas/users.schemas";
import {
  checkingBody,
  checkingTokenValid,
  checkingPermissionValid,
} from "../middleware/allChecking.middleware";
import { checkingEmailValid } from "../middleware/users.middleware";
import { Router } from "express";
import {
  createUserContoller,
  getUserController,
  getUserCoursesController,
} from "../controllers/user.controllers";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  checkingBody(userCreateSchema),
  checkingEmailValid,
  createUserContoller
);

usersRoutes.get(
  "",
  checkingTokenValid,
  checkingPermissionValid,
  getUserController
);

usersRoutes.get(
  "/:id/courses",
  checkingTokenValid,
  checkingPermissionValid,
  getUserCoursesController
);
