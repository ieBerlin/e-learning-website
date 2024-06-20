import { Express, Request, Response } from "express";
import usersRouter from "./routes/users.route";
import coursesRouter from "./routes/courses.route";
import instructorsRouter from "./routes/instructors.route";
import studentsRouter from "./routes/students.route";
import EnrollmentRouter from "./routes/enrollments.route";
import reviewRouter from "./routes/review.route";

export default function Routes(app: Express) {
  app.use("/api/users", usersRouter);
  app.use("/api/courses", coursesRouter);
  app.use("/api/instructors", instructorsRouter);
  app.use("/api/students", studentsRouter);
  app.use("/api/enrollments", EnrollmentRouter);
  app.use("/api/review", reviewRouter);
}
