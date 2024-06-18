import User from "../../models/User";
import { Request, Response } from "express";
import { emailValidator, passwordValidator } from "../../utils/validators";
import bcrypt from "bcrypt";

interface LoginErrors {
  email?: string;
  password?: string;
}

export default async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  let errors: LoginErrors = {};

  if (!email || !emailValidator(email)) {
    errors.email = "Valid email is required!";
  }
  if (!password || !passwordValidator(password)) {
    errors.password = "Password must be at least 6 characters long!";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ success: false, message: "Unauthorized Request!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password as string);

    if (!isPasswordValid) {
      return res.status(403).json({ success: false, message: "Unauthorized Request!" });
    }

    return res.status(200).json({ success: true, message: "Hello World!" });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ success: false, message: "An error occurred." });
  }
}
