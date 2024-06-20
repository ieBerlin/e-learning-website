import signup from "../controllers/auth/signup";
import login from "../controllers/auth/login";
import updateUserImage from "../controllers/auth/updateUserImage";
import { Router } from "express";
import { storageImage } from "../middleware/multerConfig";
import deserializeUser from "../middleware/deserializeUser";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.put(
  "/update-user-image",
  deserializeUser,
  storageImage,
  updateUserImage
);

export default router;
