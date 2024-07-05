// routes/enrollmentRoutes.ts

import { Router } from "express";
import createEnrollment from "../controllers/enrollment/createEnrollment";
import { getEnrollmentById } from "../controllers/enrollment/getEnrollmentById";
import { updateEnrollment } from "../controllers/enrollment/updateEnrollment";
import deleteEnrollment from "../controllers/enrollment/deleteEnrollment";
import getAllEnrollments from "../controllers/enrollment/getAllEnrollments";

const router = Router();

router.get("/", getAllEnrollments);
router.get("/:enrollmentId", getEnrollmentById);
router.post("/", createEnrollment);
router.put("/:enrollmentId", updateEnrollment);
router.delete("/:enrollmentId", deleteEnrollment);

export default router;
