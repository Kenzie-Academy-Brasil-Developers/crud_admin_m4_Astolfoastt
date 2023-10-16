import format from "pg-format";
import { client } from "../database";
import { sign } from "jsonwebtoken";
import { userListSchema, userBodySchema } from "../schemas/users.schemas";
import { compare, hash } from "bcryptjs";
import AppError from "../errors/AppError.errors";
import {
  TUserToken,
  TUser,
  TUserCreate,
  TUserLogin,
  TUserReturn,
  TUserResult,
} from "../interfaces/user.interface";

export const createUserService = async (
  data: TUserCreate
): Promise<TUserReturn> => {
  data.password = await hash(data.password, 10);

  const queryString: string = format(
    `INSERT INTO "users" (%I)
      VALUES (%L)
        RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TUserResult = await client.query(queryString);

  return userBodySchema.parse(queryResult.rows[0]);
};

export const userLoginService = async (
 data: TUserLogin
): Promise<TUserToken> => {
  const { email } =data;

  const queryResult: TUserResult = await client.query(
    `SELECT * FROM 
        "users" 
     WHERE 
        "email" = $1;`,
    [email]
  );

  if (!queryResult.rowCount) {
    throw new AppError("Wrong email/password", 401);
  }

  const user: TUser = queryResult.rows[0];
  const passwordValid = await compare(data.password, user.password);

  if (!passwordValid) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    { email: user.email, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token };
};

export const getUserService = async (): Promise<TUserReturn[]> => {
  const queryResult: TUserResult = await client.query('SELECT * FROM "users";');

  return userListSchema.parse(queryResult.rows);
};

export const getUserCoursesService = async (id: number) => {
  const queryString: string = `
        SELECT 
	    "c"."id" AS "courseId",
	    "c"."name" AS "courseName",
	    "c"."description" AS "courseDescription",
	    "uc"."active" AS "userActiveInCourse",
	    "u"."id" AS "userId",
	    "u"."name" AS "userName"
      FROM "users" AS "u"
            JOIN "userCourses" AS "uc"
                ON "uc"."userId" = "u"."id"
            JOIN "courses" AS "c"
                ON "c"."id" = "uc"."courseId"
                    WHERE "u"."id" = $1;
`;

  const queryResult: TUserResult = await client.query(queryString, [id]);

  if (!queryResult.rowCount) throw new AppError("No course found", 404);

  return queryResult.rows;
};
