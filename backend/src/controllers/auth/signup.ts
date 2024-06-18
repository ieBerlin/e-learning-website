import { Response, Request } from "express";
import {
  nameValidator,
  emailValidator,
  passwordValidator,
  roleValidator,
} from "../../utils/validators";
import { createUser, UserData } from "../../services/userService";
interface errorsInterface {
  firstName?: String;
  lastName?: String;
  email?: String;
  password?: String;
  role?: String;
}

export default async function signup(req: Request, res: Response) {
  const { firstName, lastName, email, password, role }: UserData = req.body;
  let errors: errorsInterface = {};
  if (!firstName || !nameValidator(firstName)) {
    errors.firstName = "Invalid first name";
  }
  if (!lastName || !nameValidator(lastName)) {
    errors.lastName = "Invalid last name";
  }
  if (!email || !emailValidator(email)) {
    errors.email = "Invalid email";
  }
  if (!password || !passwordValidator(password)) {
    errors.password = "Invalid password";
  }
  if (!role || !roleValidator(role)) {
    errors.role = "Invalid role";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    await createUser({
      firstName,
      lastName,
      email,
      password,
      role,
    });
    return res
      .status(201)
      .json({ success: true, message: "User Created Successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Failed to create user" });
  }
}
