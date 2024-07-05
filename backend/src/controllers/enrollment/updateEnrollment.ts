import { Request, Response } from "express";
import Enrollment from "../../models/Enrollment";
import ValidationError from "../../utils/ValidationError";

export const updateEnrollment = async (req: Request, res: Response) => {
  try {
    const { enrollmentId } = req.params;
    const { completion_status } = req.body;

    let errors: ValidationError[] = [];

    if (completion_status && typeof completion_status !== "boolean") {
      errors.push({
        field: "completion_status",
        message: "Invalid completion status. Must be true or false.",
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId,
      { completion_status },
      { new: true }
    );

    if (!updatedEnrollment) {
      return res
        .status(404)
        .json({ success: false, message: "Enrollment not found" });
    }

    res.json({ success: true, enrollment: updatedEnrollment });
  } catch (error) {
    console.error("Error updating enrollment:", error);
    res.status(500).json({ message: "Failed to update enrollment" });
  }
};
