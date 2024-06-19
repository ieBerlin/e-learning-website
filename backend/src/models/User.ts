import { Document, model, Schema } from "mongoose";
enum UserRole {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  PARENT = "parent",
  GUARDIAN = "guardian",
}
interface UserDocument extends Document {
  firstName :String ; 
  lastName :String ; 
  email :String ; 
  password :String ; 
  role :UserRole ; 
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
});
const User =model<UserDocument>('User',UserSchema,'Users');
export default User;
