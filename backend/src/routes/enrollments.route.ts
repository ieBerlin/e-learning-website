// routes/enrollmentRoutes.ts

import { Router } from "express";
import createEnrollment from "../controllers/enrollment/createEnrollment";
import { getEnrollmentById } from "../controllers/enrollment/getEnrollmentById";
import { updateEnrollment } from "../controllers/enrollment/updateEnrollment";
import deleteEnrollment from "../controllers/enrollment/deleteEnrollment";
import getAllEnrollments from "../controllers/enrollment/getAllEnrollments";

const router = Router();

router.post("/", createEnrollment);
router.get("/", getAllEnrollments);
router.get("/:enrollmentId", getEnrollmentById);
router.put("/:enrollmentId", updateEnrollment);
router.delete("/:enrollmentId", deleteEnrollment);

export default router;
