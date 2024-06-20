import { Request, Response } from "express";
import Instructor from "../../models/Instructor";

const updateInstructor = async (req: Request, res: Response) => {
  try {
    const { instructorId } = req.params;
    const { bio, experience, courses } = req.body;

    const instructor = await Instructor.findById(instructorId);
    
    if (!instructor) {
        return res.status(404).json({ success: false, message: "Instructor not found" });
    }
    
    if (bio !== undefined) instructor.bio = bio;
    if (experience !== undefined) instructor.expertise = experience;
    if (courses !== undefined) instructor.courses = courses;
    await instructor.save();

    return res.status(200).json({ success: true, instructor });
  } catch (error) {
    console.log("Error occurred: " + error);
    return res.status(500).json({ message: "Error updating instructor" });
  }
};

export default updateInstructor;
