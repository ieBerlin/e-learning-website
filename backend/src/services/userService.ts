import Instructor from "../models/Instructor";
import Student from "../models/Student";
import User from "../models/User";
const bcrypt = require("bcrypt");
const saltRounds = 10;

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export async function createUser(userData: UserData) {
  const {
    firstName,
    lastName,
    email,
    password: plaintextPassword,
    role,
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
    if (role === "instructor") {
      await Instructor.create({
        userId: newUser._id,
        bio: "Hello World this is berlin here",
        expertise: "Spanish",
      });
    } else if (role === "student") {
      await Student.create({
        userId: newUser._id,
      });
    }
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user: " + error.message);
  }
}
