import { Request, Response } from "express";
import Enrollment from "../../models/Enrollment";

const createEnrollment = async (req: Request, res: Response) => {
  try {
    const { user_id, course_id, completion_status } = req.body;

    const newEnrollment = new Enrollment({ user_id, course_id, completion_status });
    await newEnrollment.save();

    res.status(201).json({ success: true, enrollment: newEnrollment });
  } catch (error) {
    console.error("Error creating enrollment:", error);
    res.status(500).json({ message: "Failed to create enrollment" });
  }
};
export default createEnrollment
