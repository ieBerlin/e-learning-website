import { Request, Response } from "express";
import Student from "../../models/Student";

const deleteStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error.message);
    res.status(500).json({ success: false, message: "Error deleting student" });
  }
};

export default deleteStudent;
