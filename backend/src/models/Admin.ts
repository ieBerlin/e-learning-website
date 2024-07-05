import { Document, model, Schema } from "mongoose";

interface IAdmin extends Document {
  userId: string;
}
const AdminSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

const Admin = model("Admin", AdminSchema, "Admins");
export default Admin;
