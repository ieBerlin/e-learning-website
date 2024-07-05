import { Request, Response } from "express";
import Instructor from "../../models/Instructor";
import ValidationError from "../../utils/ValidationError";
interface IErrors {
  userId?: string;
  bio?: string;
  experience?: string;
  courses?: string;
}

const createInstructor = async (req: Request, res: Response) => {
  try {
    const { userId, bio, experience, courses } = req.body;
    const errors: ValidationError[] = [];

    if (!userId || typeof userId !== "string") {
      errors.push({ field: "userId", message: "User ID is required!" });
    }
    if (!bio || typeof bio !== "string") {
      errors.push({ field: "bio", message: "Bio is required!" });
    }
    if (!experience || typeof experience !== "string") {
      errors.push({ field: "experience", message: "Experience is required!" });
    }
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const existingInstructor = await Instructor.findOne({ userId });
    if (existingInstructor) {
      return res
        .status(409)
        .json({ success: false, message: "Instructor already exists" });
    }

    const newInstructor = new Instructor({
      userId,
      bio,
      experience,
      courses: courses || [],
    });

    await newInstructor.save();
    return res.status(201).json({ success: true, instructor: newInstructor });
  } catch (error) {
    console.log("Error occurred: " + error);
    return res.status(500).json({ message: "Error creating instructor" });
  }
};

export default createInstructor;
