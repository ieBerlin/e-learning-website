import { Request, Response } from "express";
import Instructor from "../../models/Instructor";

const getListInstructors = async (_: Request, res: Response) => {
  try {
    const instructors = await Instructor.find();

    const filteredInstructors = instructors.map(instructor => ({
      courses: instructor.courses,
      _id: instructor._id,
      userId: instructor.userId,
      ratings: instructor.ratings,
      bio: instructor.bio,
      experience: instructor.expertise
    }));
    return res.status(200).json({ success: true, instructors: filteredInstructors });
  } catch (error) {
    console.log("Error occurred: " + error);
    return res.status(500).json({ message: "Error retrieving instructors" });
  }
};

export default getListInstructors;
