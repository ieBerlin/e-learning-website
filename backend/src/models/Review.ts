import { Document, model, Schema } from "mongoose";

export interface IReview extends Document {
  user_id: Schema.Types.ObjectId;
  course_id: Schema.Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
}
const ReviewSchema: Schema = new Schema<IReview>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course_id: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Review = model<IReview>("Review", ReviewSchema,'Reviews');

export default Review;
