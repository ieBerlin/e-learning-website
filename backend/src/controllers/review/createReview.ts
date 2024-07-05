import { Request, Response } from "express";
import Review from "../../models/Review";
import ValidationError from "../../utils/ValidationError";

const createReview = async (req: Request, res: Response) => {
  try {
    const { user_id, course_id, rating, comment } = req.body;

    let errors: ValidationError[] = [];

    if (!user_id) {
      errors.push({ field: "user_id", message: "User ID is required." });
    }

    if (!course_id) {
      errors.push({ field: "course_id", message: "Course ID is required." });
    }

    if (
      !rating ||
      typeof rating !== "number" ||
      isNaN(rating) ||
      rating < 0 ||
      rating > 10
    ) {
      errors.push({
        field: "rating",
        message: "Invalid rating. Must be a number between 0 and 10.",
      });
    }

    if (!comment || typeof comment !== "string" || comment.trim() === "") {
      errors.push({
        field: "comment",
        message: "Comment is required and must be a string.",
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const newReview = new Review({ user_id, course_id, rating, comment });
    await newReview.save();

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error creating review:", error.message);
    res.status(500).json({ message: "Failed to create review" });
  }
};

export default createReview;
