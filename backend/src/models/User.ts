import { Document, model, Schema, Types } from "mongoose";
enum UserRole {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  GUARDIAN = "guardian",
  ADMIN = "admin",
}
interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  image: string;
}
const UserSchema: Schema = new Schema<UserDocument>({
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  email: { required: true, type: String, unique: true },
  password: { required: true, type: String },
  role: {
    type: String,
    required: true,
    enum: Object.values(UserRole),
    default: UserRole.STUDENT,
  },
  image: { type: String, default: "" },
});
const User = model<UserDocument>("User", UserSchema, "Users");
export default User;
