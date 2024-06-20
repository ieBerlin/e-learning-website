import Review, { IReview } from "../../models/Review";
import { Request, Response } from "express";
const createReview = async (req: Request, res: Response) => {
  try {
    const { user_id, course_id, rating, comment } = req.body;

    const newReview = new Review({ user_id, course_id, rating, comment });
    await newReview.save();

    res.status(201).json();
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Failed to create review" });
  }
};
export default createReview;
