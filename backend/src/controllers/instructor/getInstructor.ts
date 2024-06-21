import { Request, Response } from "express";
import Instructor from "../../models/Instructor";
import User from "../../models/User";

const getInstructor = async (req: Request, res: Response) => {
  try {
    const { instructorId } = req.params;
    const instructor = await Instructor.findOne({ userId: instructorId });
    const additionalInformations = await User.findById(instructor.userId);
    if (!instructor) {
      return res
        .status(404)
        .json({ success: false, message: "Instructor not found" });
    }

    const instructorData = {
      courses: instructor.courses,
      _id: instructor._id,
      userId: instructor.userId,
      ratings: instructor.ratings,
      bio: instructor.bio,
      experience: instructor.expertise,
      firstName: additionalInformations?.firstName,
      lastName: additionalInformations?.lastName,
      email: additionalInformations?.email,
    };

    return res.status(200).json({ success: true, instructor: instructorData });
  } catch (error) {
    console.log("Error occurred: " + error);
    return res.status(500).json({ message: "Error retrieving instructor" });
  }
};

export default getInstructor;
