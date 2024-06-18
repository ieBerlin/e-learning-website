import { Express, Request, Response } from "express";
import authRouter from "./routes/auth.route";
export default function Routes(app: Express) {
  app.use("/api/auth", authRouter);
}
