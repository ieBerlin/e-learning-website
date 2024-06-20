import { Request, Response } from "express";
import Instructor from "../../models/Instructor";
import Course from "../../models/Course";

const getInstructorCourses = async (req: Request, res: Response) => {
  try {
    const { instructorId } = req.params;
    const instructor = await Instructor.findById(instructorId);

    if (!instructor) {
      return res.status(404).json({ success: false, message: "Instructor not found" });
    }
    const courses = await Course.find({ _id: { $in: instructor.courses } });

    return res.status(200).json({ success: true, courses });
  } catch (error) {
    console.log("Error occurred: " + error);
    return res.status(500).json({ message: "Error retrieving courses" });
  }
};

export default getInstructorCourses;
