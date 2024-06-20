import { Schema, model, Types } from "mongoose";

const EnrollmentSchema = new Schema({
  user_id: { type: Types.ObjectId, ref: "User", required: true },
  course_id: { type: Types.ObjectId, ref: "Course", required: true },
  enrollment_date: { type: Date, default: Date.now },
  completion_status: { type: String, enum: ["completed", "in progress"], default: "in progress" }
});

const Enrollment = model("Enrollment", EnrollmentSchema,'Enrollments');

export default Enrollment;
