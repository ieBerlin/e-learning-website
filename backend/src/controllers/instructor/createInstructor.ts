import { Request, Response } from "express";
import Instructor from "../../models/Instructor";
interface IErrors {
  userId?: string;
  bio?: string;
  experience?: string;
  courses?: string;
}

const createInstructor = async (req: Request, res: Response) => {
  try {
    const { userId, bio, experience, courses } = req.body;
    let errors: IErrors = {};

    if (!userId) {
      errors.userId = "User ID is required!";
    }
    if (!bio) {
      errors.bio = "Bio is required!";
    }
    if (!experience) {
      errors.experience = "Experience is required!";
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
