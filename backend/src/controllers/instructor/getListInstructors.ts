import { Request, Response } from "express";
import Instructor from "../../models/Instructor";
import User from "../../models/User";

const getListInstructors = async (_: Request, res: Response) => {
  try {
    const instructors = await Instructor.find();

    const filteredInstructors = await Promise.all(
      instructors.map(async (instructor) => {
        const additionalInformations = await User.findById(instructor.userId);
        return {
          _id: instructor._id,
          courses: instructor.courses,
          userId: instructor.userId,
          ratings: instructor.ratings,
          bio: instructor.bio,
          experience: instructor.expertise,
          firstName: additionalInformations?.firstName,
          lastName: additionalInformations?.lastName,
          email: additionalInformations?.email,
        };
      })
    );

    return res
      .status(200)
      .json({ success: true, instructors: filteredInstructors });
  } catch (error) {
    console.log("Error occurred: " + error);
    return res.status(500).json({ message: "Error retrieving instructors" });
  }
};

export default getListInstructors;
