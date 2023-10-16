import { createCourseSchema } from "../schemas/courses.schemas";
import { Router } from "express";
import {
  createCourseController,
  deleteUserCourseController,
  getCoursesController,
  getCourseByUserController,
  creatUserCourseController,
} from "../controllers/courses.controllers";
import {
  checkingCourseValid,
  checkingUserCoursesValid,
  checkingPermissionUser,
} from "../middleware/courses.middleware";
import {
  checkingBody,
  checkingTokenValid,
  checkingPermissionValid,
} from "../middleware/allChecking.middleware";

export const coursesRoutes: Router = Router();

coursesRoutes.post(
  "",
  checkingBody(createCourseSchema),
  checkingTokenValid,
  checkingPermissionValid,
  createCourseController
);

coursesRoutes.get("", getCoursesController);

coursesRoutes.post(
  "/:courseId/users/:userId",
  checkingCourseValid,
  checkingUserCoursesValid,
  checkingTokenValid,
  checkingPermissionValid,
  creatUserCourseController
);

coursesRoutes.delete(
  "/:courseId/users/:userId",
  checkingCourseValid,
  checkingUserCoursesValid,
  checkingTokenValid,
  checkingPermissionValid,
  deleteUserCourseController
);

coursesRoutes.get(
  "/:id/users",
  checkingTokenValid,
  checkingPermissionUser,
  getCourseByUserController
);
