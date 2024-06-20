// controllers/student/updateStudent.ts

import { Request, Response } from "express";
import Student, { IStudent } from "../../models/Student";

const updateStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const { name, email, age } = req.body;

  try {
    const updatedStudent: IStudent | null = await Student.findByIdAndUpdate(
      studentId,
      { name, email, age },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, student: updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error.message);
    res.status(500).json({ success: false, message: "Error updating student" });
  }
};

export default updateStudent;
