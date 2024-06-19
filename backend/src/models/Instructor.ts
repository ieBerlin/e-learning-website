import { Document, model, Schema } from "mongoose";

export interface InstructorDocument extends Document {
  userId: Document & { _id: string };
  courses: string[];
  ratings: Map<string, number[]>;
  bio: string;
  expertise: string;
}
const InstructorSchema: Schema<InstructorDocument> =
  new Schema<InstructorDocument>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courses: { type: [String], required: true, default: [] },
    ratings: { type: Map, required: true, default: {} },
    bio: { type: String, required: true, default: "" },
    expertise: { type: String, required: true, default: "" },
  });
const Instructor = model<InstructorDocument>(
  "Instructor",
  InstructorSchema,
  "Instructors"
);
export default Instructor;
