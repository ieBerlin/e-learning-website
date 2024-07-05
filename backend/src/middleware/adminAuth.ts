import { Request, Response, NextFunction } from "express";
import Admin from "../models/Admin";

const adminAuth = async (_, res: Response, next: NextFunction) => {
  const userId = res.locals.user.userId;
  try {
    const adminExist = await Admin.findOne({ userId });
    if (!adminExist) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized Admin Access!" });
    }
    next();
  } catch (error) {
    console.error("Error checking admin access:", error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred." });
  }
};

export default adminAuth;
