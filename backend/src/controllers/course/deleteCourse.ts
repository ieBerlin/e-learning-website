import { Request, Response } from "express";
import Course from "../../models/Course";

const deleteCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error.message);
    res.status(500).json({ success: false, message: "Error deleting course" });
  }
};

export default deleteCourse;
