import "express-async-errors";
import "dotenv/config";
import express, { Application } from "express";
import { usersRoutes } from "./routes/users.routes";
import { loginRoutes } from "./routes/login.routes";
import { coursesRoutes } from "./routes/courses.routes";
import { handleErrors } from "./middleware/handleErrors.middleware";

const app: Application = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/courses", coursesRoutes);
app.use("/login", loginRoutes);
app.use(handleErrors);

export default app;

