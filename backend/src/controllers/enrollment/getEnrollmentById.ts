import { Request, Response } from "express";
import Enrollment from "../../models/Enrollment";

export const getEnrollmentById = async (req: Request, res: Response) => {
    try {
      const { enrollmentId } = req.params;
  
      const enrollment = await Enrollment.findById(enrollmentId).populate("user_id course_id");
      if (!enrollment) {
        return res.status(404).json({ success: false, message: "Enrollment not found" });
      }
  
      res.json({ success: true, enrollment });
    } catch (error) {
      console.error("Error fetching enrollment:", error);
      res.status(500).json({ message: "Failed to fetch enrollment" });
    }
  };
  