import { Document, model, Schema } from "mongoose";

export interface IGuardian extends Document {
  userId: Schema.Types.ObjectId;
  phoneNumber: string;
  relationship: string;
  contactedEmail: string;
  enrolledCourses: string[];
  progress: Map<string, number>;
  certificates: string[];
  selectedLanguages: string[];
  proficiencyLevel: string;
  learningInterests: string[];
  createdAt: Date;
  updatedAt: Date;
}

const GuardianSchema: Schema<IGuardian> = new Schema<IGuardian>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  phoneNumber: { type: String },
  relationship: { type: String },
  contactedEmail: { type: String },
  enrolledCourses: { type: [String], required: true, default: [] },
  progress: { type: Map, required: true, default: {} },
  certificates: { type: [String], required: true, default: [] },
  selectedLanguages: { type: [String], default: [] },
  proficiencyLevel: { type: String },
  learningInterests: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<IGuardian>("Guardian", GuardianSchema, "Guardians");
