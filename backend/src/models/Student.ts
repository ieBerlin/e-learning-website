import { Document, model, Schema } from "mongoose";

export interface IStudent extends Document {
  userId: Document & { _id: string };
  enrolledCourses: string[];
  progress: Map<string, number>;
  certificates: string[];
  selectedLanguages: string[];
  proficiencyLevel: string;
  learningInterests: string[];
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema<IStudent> = new Schema<IStudent>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  enrolledCourses: { type: [String], required: true, default: [] },
  progress: { type: Map, required: true, default: {} },
  certificates: { type: [String], required: true, default: [] },
  selectedLanguages: { type: [String], default: [] },
  proficiencyLevel: { type: String },
  learningInterests: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
export default model<IStudent>("Student", StudentSchema, "Students");
