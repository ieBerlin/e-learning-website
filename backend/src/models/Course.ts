import { Document, model, Schema, Types } from "mongoose";
import User from "./User";

export interface ICourse extends Document {
  title: string;
  description: string;
  instructor_id: string;
  category_id: string;
  length: number;
  price: number;
  ratings: Map<string, number>; // Map of userId to rating (number between 0 and 10)
  createdAt: Date;
}

// Schema definition for Course
const CourseSchema: Schema<ICourse> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor_id: { type: String, ref: "User", required: true },
  category_id: { type: String, ref: "Category", required: true },
  length: { type: Number, required: true },
  price: { type: Number, required: true },
  ratings: { type: Map, of: Number, default: new Map() },
  createdAt: { type: Date, default: Date.now },
});

const Course = model<ICourse>("Course", CourseSchema, "Courses");

export default Course;
