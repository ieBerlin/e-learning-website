import { Request, Response } from "express";
import Enrollment from "../../models/Enrollment";
export const updateEnrollment = async (req: Request, res: Response) => {
  try {
    const { enrollmentId } = req.params;
    const { completion_status } = req.body;

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
