import { Request, Response } from "express";
import Student, { IStudent } from "../../models/Student";
const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;

    const newStudent: IStudent = new Student({
      name,
      email,
      age,
    });

    const savedStudent = await newStudent.save();

    res.status(201).json({ success: true, student: savedStudent });
  } catch (error) {
    console.error("Error creating student:", error.message);
    res.status(500).json({ success: false, message: "Error creating student" });
  }
};

export default createStudent;
