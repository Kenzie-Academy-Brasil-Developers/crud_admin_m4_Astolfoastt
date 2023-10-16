import { userLoginSchema } from "../schemas/users.schemas";
import { Router } from "express";
import { userLoginContoller } from "../controllers/user.controllers";
import { checkingBody } from "../middleware/allChecking.middleware";

export const loginRoutes: Router = Router();

loginRoutes.post("", checkingBody(userLoginSchema), userLoginContoller);
