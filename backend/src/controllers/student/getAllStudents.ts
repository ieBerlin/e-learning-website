import { Request, Response } from "express";
import Student, { IStudent } from "../../models/Student";

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students: IStudent[] = await Student.find();
    res.status(200).json({ success: true, students });
  } catch (error) {
    console.error("Error retrieving students:", error.message);
    res.status(500).json({ success: false, message: "Error retrieving students" });
  }
};

export default getAllStudents;
