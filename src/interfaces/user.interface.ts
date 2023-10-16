import { QueryResult } from "pg";
import {
  userSchema,
  userCreateSchema,
  userBodySchema,
  userListSchema,
  userLoginSchema,
} from "../schemas/users.schemas";
import { z } from "zod";

export type TUser = z.infer<typeof userSchema>;
export type TUserCreate = z.infer<typeof userCreateSchema>;
export type TUserReturn = z.infer<typeof userBodySchema>;
export type TUserList = z.infer<typeof userListSchema>;
export type TUserLogin = z.infer<typeof userLoginSchema>;
export type TUserToken = { token: string };
export type TUserResult = QueryResult<TUser>;
