import { Request, Response } from "express";
import Student, { IStudent } from "../../models/Student";
import ValidationError from "../../utils/ValidationError";
import { emailValidator, nameValidator } from "../../utils/validators";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;

    let errors: ValidationError[] = [];

    if (!name || typeof name !== "string" || nameValidator(name)) {
      errors.push({
        field: "name",
        message: "Name is required and must be a string.",
      });
    }

    if (!email || typeof email !== "string" || !emailValidator(email)) {
      errors.push({ field: "email", message: "Invalid email format." });
    }

    if (age !== undefined && (isNaN(age) || age <= 0)) {
      errors.push({ field: "age", message: "Age must be a positive number." });
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

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
