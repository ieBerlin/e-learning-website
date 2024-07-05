import { Request, Response } from "express";
import Course, { ICourse } from "../../models/Course";

const getAllCourses = async (_, res: Response) => {
  try {
    const courses: ICourse[] = await Course.find();
    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Error retrieving courses:", error.message);
    res.status(500).json({ success: false, message: "Error retrieving courses" });
  }
};

export default getAllCourses;
