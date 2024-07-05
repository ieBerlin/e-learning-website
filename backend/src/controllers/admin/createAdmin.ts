import { Request, Response } from "express";
import {
  createUser,
  doesUserExist,
  UserData,
} from "../../services/userService";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from "../../utils/validators";
import ValidationError from "../../utils/ValidationError";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const errors: ValidationError[] = [];

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

    if (!email || typeof email !== "string" || !emailValidator(email)) {
      errors.push({ field: "email", message: "Invalid email" });
    }
    if (
      !password ||
      typeof password !== "string" ||
      !passwordValidator(password)
    ) {
      errors.push({ field: "password", message: "Invalid password" });
    }
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    if (await doesUserExist(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }
    const data: UserData = {
      firstName,
      lastName,
      email,
      password,
      role: "admin",
    };
    await createUser(data);

    res
      .status(201)
      .json({ success: true, message: "Admin created successfully!" });
  } catch (error) {
    console.error("Error creating admin:", error.message);
    res.status(500).json({ success: false, message: "Error creating admin" });
  }
};

export default createAdmin;
