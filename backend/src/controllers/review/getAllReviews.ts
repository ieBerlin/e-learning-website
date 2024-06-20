import Review, { IReview } from "../../models/Review";
import { Request, Response } from "express";
const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find().populate("user_id course_id");
    res.json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
export default getAllReviews;
