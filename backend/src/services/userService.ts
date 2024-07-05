import Admin from "../models/Admin";
import Guardian from "../models/Guardian";
import Instructor from "../models/Instructor";
import Student from "../models/Student";
import User from "../models/User";
import bcrypt from 'bcrypt';
const saltRounds = 10;

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  bio?: string;
  expertise?: string;
  courses?: string[];
  selectedLanguages?: string[];
  proficiencyLevel?: string;
  learningInterests?: string[];
  phoneNumber?: number;
  relationship?: string;
  contactedEmail?: string;
}
export async function doesUserExist(email: string): Promise<boolean> {
  try {
    const user = await User.findOne({ email });
    return !!user;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
}

export async function createUser(userData: UserData) {
  const {
    firstName,
    lastName,
    email,
    password: plaintextPassword,
    role,
    bio,
    expertise,
    selectedLanguages,
    proficiencyLevel,
    learningInterests,
    phoneNumber,
    relationship,
    contactedEmail,
  } = userData;

  try {
    const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });
    switch (role) {
      case "instructor":
        return await Instructor.create({ userId: newUser._id, bio, expertise });
      case "admin":
        return await Admin.create({ userId: newUser._id });
      case "guardian":
        return await Guardian.create({
          userId: newUser._id,
          phoneNumber,
          relationship,
          contactedEmail,
          selectedLanguages,
          proficiencyLevel,
          learningInterests,
        });
      case "student":
        return await Student.create({
          userId: newUser._id,
          selectedLanguages,
          proficiencyLevel,
          learningInterests,
        });
    }

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user: " + error.message);
  }
}
