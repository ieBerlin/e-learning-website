import { Request, Response } from "express";
import ValidationError from "../../utils/ValidationError";
import Enrollment from "../../models/Enrollment";
const createEnrollment = async (req: Request, res: Response) => {
  try {
    const { user_id, course_id, completion_status } = req.body;

    let errors: ValidationError[] = [];

    if (!user_id) {
      errors.push({ field: "user_id", message: "User ID is required." });
    }

    if (!course_id) {
      errors.push({ field: "course_id", message: "Course ID is required." });
    }

    if (completion_status && typeof completion_status !== "boolean") {
      errors.push({
        field: "completion_status",
        message: "Invalid completion status. Must be true or false.",
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const newEnrollment = new Enrollment({
      user_id,
      course_id,
      completion_status,
    });
    await newEnrollment.save();

    res.status(201).json({ success: true, enrollment: newEnrollment });
  } catch (error) {
    console.error("Error creating enrollment:", error.message);
    res.status(500).json({ message: "Failed to create enrollment" });
  }
};

export default createEnrollment;
