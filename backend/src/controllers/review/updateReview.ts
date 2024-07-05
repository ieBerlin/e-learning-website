import { Request, Response } from "express";
import Review, { IReview } from "../../models/Review";
import ValidationError from "../../utils/ValidationError"; 

const updateReview = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    let errors: ValidationError[] = [];

    if (rating !== undefined && (typeof rating !== "number" || isNaN(rating) || rating < 0 || rating > 10)) {
      errors.push({ field: "rating", message: "Invalid rating. Must be a number between 0 and 10." });
    }

    if (comment !== undefined && (typeof comment !== "string" || comment.trim() === "")) {
      errors.push({ field: "comment", message: "Comment must be a string and cannot be empty." });
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.json({ success: true, review: updatedReview });
  } catch (error) {
    console.error("Error updating review:", error.message);
    res.status(500).json({ message: "Failed to update review" });
  }
};

export default updateReview;