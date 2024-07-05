import { Request, Response } from "express";
import Student, { IStudent } from "../../models/Student";
import ValidationError from "../../utils/ValidationError"; // Assuming ValidationError exists
import { emailValidator, nameValidator } from "../../utils/validators";

const updateStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
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

    const updatedStudent: IStudent | null = await Student.findOne(
      { userId: studentId },
      { name, email, age },
      { new: true }
    );

    if (!updatedStudent) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, student: updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error.message);
    res.status(500).json({ success: false, message: "Error updating student" });
  }
};

export default updateStudent;
