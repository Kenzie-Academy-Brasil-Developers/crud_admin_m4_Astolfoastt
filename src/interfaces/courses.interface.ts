import { QueryResult } from "pg";
import { courseSchema, createCourseSchema } from "../schemas/courses.schemas";
import { z } from "zod";

export type TCourse = z.infer<typeof courseSchema>;
export type TCourseCreate = z.infer<typeof createCourseSchema>;
export type TCourseResult = QueryResult<TCourse>;
