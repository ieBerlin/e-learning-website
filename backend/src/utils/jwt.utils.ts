import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables");
}

interface VerificationToken {
  isValid: boolean;
  isExpired: boolean | string;
  decoded: JwtPayload | null;
}
export async function verifyJwt(token: string): Promise<VerificationToken> {
  if (!token) {
    return {
      isValid: false,
      isExpired: true,
      decoded: null,
    };
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    const result = await User.findOne({ email: decoded.email });
    const userData = {
      email: decoded.email,
      userId: result._id,
    };
    return {
      isValid: true,
      isExpired: false,
      decoded: userData,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return {
        isValid: false,
        isExpired: true,
        decoded: null,
      };
    } else {
      return {
        isValid: false,
        isExpired: error.message,
        decoded: null,
      };
    }
  }
}

export function signJwt(email: string): string {
  return jwt.sign(
    {
      email,
    },
    JWT_SECRET_KEY,
    {
      expiresIn: 24000,
    }
  );
}
