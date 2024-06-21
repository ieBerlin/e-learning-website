import Instructor from "../models/Instructor";
import Student from "../models/Student";
import User from "../models/User";
import { Response } from "express";
const bcrypt = require("bcrypt");
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
        await Instructor.create({ bio, expertise, userId: newUser._id });
      case "student":
        await Student.create({
          userId: newUser._id,
          selectedLanguages,
          proficiencyLevel,
          learningInterests,
        });
        break;
    }

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user: " + error.message);
  }
}
