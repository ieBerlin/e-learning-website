import { Router } from "express";
import createReview from "../controllers/review/createReview";
import getAllReviews from "../controllers/review/getAllReviews";
import getReviewById from "../controllers/review/getReviewById";
import updateReview from "../controllers/review/updateReview";
import deleteReview from "../controllers/review/deleteReview";

const router = Router();

router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/:reviewId", getReviewById);
router.put("/:reviewId", updateReview);
router.delete("/:reviewId", deleteReview);

export default router;
