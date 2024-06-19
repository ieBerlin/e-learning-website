import { Document, model, Schema } from "mongoose";

export interface StudentDocument extends Document {
  userId: Document & { _id: string };
  enrolledCourses: string[];
  progress: Map<string, number>;
  certificates: string[];
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema<StudentDocument> = new Schema<StudentDocument>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  enrolledCourses: { type: [String], required: true, default: [] },
  progress: { type: Map, required: true, default: {} },
  certificates: { type: [String], required: true, default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
export default model<StudentDocument>("Student", StudentSchema,'Students');
