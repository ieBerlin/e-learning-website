import Review, { IReview } from "../../models/Review";
import { Request, Response } from "express";

const getReviewById = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId).populate(
      "user_id course_id"
    );
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    res.json({ success: true, review });
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ message: "Failed to fetch review" });
  }
};
export default getReviewById;
