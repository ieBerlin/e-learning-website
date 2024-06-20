import { Request, Response } from "express";
import Instructor from "../../models/Instructor";

const deleteInstructor = async (req: Request, res: Response) => {
  try {
    const { instructorId } = req.params;
    const instructor = await Instructor.findOneAndDelete({
      userId: instructorId,
    });

    if (!instructor) {
      return res
        .status(404)
        .json({ success: false, message: "Instructor not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Instructor deleted successfully" });
  } catch (error) {
    console.log("Error occurred: " + error);
    return res.status(500).json({ message: "Error deleting instructor" });
  }
};

export default deleteInstructor;
