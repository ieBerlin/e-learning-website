import { Request, Response } from "express";
import Course, { ICourse } from "../../models/Course";
import { Types } from "mongoose";

const getCourseById = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  try {
    const course: ICourse | null = await Course.findById(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, course });
  } catch (error) {
    console.error("Error retrieving course:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving course" });
  }
};

export default getCourseById;
