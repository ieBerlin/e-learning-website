import { Response, Request } from "express";
import {
  nameValidator,
  emailValidator,
  passwordValidator,
  roleValidator,
} from "../../utils/validators";
import {
  createUser,
  doesUserExist,
  UserData,
} from "../../services/userService";
interface errorsInterface {
  firstName?: String;
  lastName?: String;
  email?: String;
  password?: String;
  role?: String;
  bio?: string;
  expertise?: string;
}

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
  }: UserData = req.body;
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
  if (role === "instructor" && !bio) {
    errors.bio = "Invalid bio";
  }
  if (role === "instructor" && !expertise) {
    errors.expertise = "Invalid expertise";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    if (await doesUserExist(email)) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
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
