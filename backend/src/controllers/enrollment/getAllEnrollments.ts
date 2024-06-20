import { Request, Response } from "express";
import Enrollment from "../../models/Enrollment";

const getAllEnrollments = async (req: Request, res: Response) => {
  try {
    const enrollments = await Enrollment.find().populate("user_id course_id");
    res.json({ success: true, enrollments });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
};
export default getAllEnrollments;