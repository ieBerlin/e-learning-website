import { Request, Response } from "express";
import Enrollment from "../../models/Enrollment";

 const deleteEnrollment = async (req: Request, res: Response) => {
    try {
      const { enrollmentId } = req.params;
  
      const deletedEnrollment = await Enrollment.findByIdAndDelete(enrollmentId);
      if (!deletedEnrollment) {
        return res.status(404).json({ success: false, message: "Enrollment not found" });
      }
  
      res.json({ success: true, message: "Enrollment deleted successfully" });
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      res.status(500).json({ message: "Failed to delete enrollment" });
    }
  };
  export default deleteEnrollment