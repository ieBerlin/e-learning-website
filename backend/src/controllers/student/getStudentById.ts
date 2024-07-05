import { Request, Response } from "express";
import Student, { IStudent } from "../../models/Student";
import { Types } from "mongoose";

const getStudentById = async (req: Request, res: Response) => {
  const { studentId } = req.params;

  try {
    const student: IStudent | null = await Student.findById(studentId);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, student });
  } catch (error) {
    console.error("Error retrieving student:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving student" });
  }
};

export default getStudentById;
