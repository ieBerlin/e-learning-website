import { Response, Request } from "express";
import {
  nameValidator,
  emailValidator,
  passwordValidator,
  roleValidator,
  phoneNumberValidatorForGuardian,
} from "../../utils/validators";
import {
  createUser,
  doesUserExist,
  UserData,
} from "../../services/userService";
import ValidationError from "../../utils/ValidationError";

export default async function signup(req: Request, res: Response) {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    bio,
    expertise,
    selectedLanguages,
    proficiencyLevel,
    learningInterests,
    phoneNumber,
    relationship,
    contactedEmail,
  }: UserData = req.body;
  const errors: ValidationError[] = [];
  try {
    if (!email || typeof email !== "string" || !emailValidator(email)) {
      errors.push({ field: "email", message: "Invalid email" });
    }
    if (await doesUserExist(email)) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (
      !firstName ||
      typeof firstName !== "string" ||
      !nameValidator(firstName)
    ) {
      errors.push({ field: "firstName", message: "Invalid first name" });
    }

    if (!lastName || typeof lastName !== "string" || !nameValidator(lastName)) {
      errors.push({ field: "lastName", message: "Invalid last name" });
    }

    if (
      !password ||
      typeof password !== "string" ||
      !passwordValidator(password)
    ) {
      errors.push({ field: "password", message: "Invalid password" });
    }

    if (!role || typeof role !== "string" || !roleValidator(role)) {
      errors.push({ field: "role", message: "Invalid role" });
    }

    if (role === "instructor") {
      if (!bio || typeof bio !== "string") {
        errors.push({ field: "bio", message: "Invalid bio" });
      }
      if (!expertise || typeof expertise !== "string") {
        errors.push({ field: "expertise", message: "Invalid expertise" });
      }
    }

    if (role === "guardian") {
      if (
        !phoneNumber ||
        typeof phoneNumber !== "string" ||
        !phoneNumberValidatorForGuardian(phoneNumber)
      ) {
        errors.push({ field: "phoneNumber", message: "Invalid phone number" });
      }
    }
    if (!relationship || typeof relationship !== "string") {
      errors.push({ field: "relationship", message: "Invalid relationship" });
    }
    if (
      !contactedEmail ||
      typeof contactedEmail !== "string" ||
      !emailValidator(contactedEmail)
    ) {
      errors.push({
        field: "contactedEmail",
        message: "Invalid contacted email",
      });
    }
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    await createUser({
      firstName,
      lastName,
      email,
      password,
      role,
      bio,
      expertise,
      selectedLanguages,
      proficiencyLevel,
      learningInterests,
      phoneNumber,
      relationship,
      contactedEmail,
    });
    return res
      .status(201)
      .json({ success: true, message: "User Created Successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create user" });
  }
}
