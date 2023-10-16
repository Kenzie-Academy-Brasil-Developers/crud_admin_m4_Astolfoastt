import format from "pg-format";
import { client } from "../database";
import {
  TCourseCreate,
  TCourse,
  TCourseResult,
} from "../interfaces/courses.interface";

export const createCourseService = async (
 data: TCourseCreate
): Promise<TCourse> => {
  const queryString: string = format(
    `INSERT INTO "courses" (%I)
       VALUES (%L)
     RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TCourseResult = await client.query(queryString);
  return queryResult.rows[0];
};

export const getCoursesService = async (): Promise<TCourse[]> => {
  const queryResult: TCourseResult = await client.query(
    'SELECT * FROM "courses";'
  );

  return queryResult.rows;
};

export const creatUserCourseService = async (
  userId: number,
  courseId: number
): Promise<void> => {
  const signUp = {
    userId: userId,
    courseId: courseId,
  };
  const queryString: string = format(
    `
            INSERT INTO "userCourses" (%I)
            VALUES (%L);
        `,
    Object.keys(signUp),
    Object.values(signUp)
  );

  await client.query(queryString);
};

export const deleteUserCourseService = async (
  userId: number,
  courseId: number
): Promise<void> => {
  await client.query(
    'DELETE FROM "userCourses" WHERE "userId" = $1 AND "courseId" = $2;',
    [userId, courseId]
  );
};

export const getCourseByUserService = async (id: number) => {
  const queryString: string = `
        SELECT 
	    "u"."id" AS "userId",
	    "u"."name" AS "userName",
	    "c"."id" AS "courseId",
	    "c"."name" AS "courseName",
	    "c"."description" AS "courseDescription",
	    "uc"."active" AS "userActiveInCourse"
        FROM "users" AS "u"
            JOIN "userCourses" AS "uc"
                ON "uc"."userId" = "u"."id"
            JOIN "courses" AS "c"
                ON "c"."id" = "uc"."courseId"
                        WHERE "c"."id" = $1;`;
  const queryResult: TCourseResult = await client.query(queryString, [id]);

  return queryResult.rows;
};
