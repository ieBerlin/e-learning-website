import { Router } from "express";
import getListInstructors from "../controllers/instructor/getListInstructors"
import getInstructor from "../controllers/instructor/getInstructor"
import getInstructorCourses from "../controllers/instructor/getInstructorCourses"
import createInstructor from "../controllers/instructor/createInstructor"
import updateInstructor from "../controllers/instructor/updateInstructor"
import deleteInstructor from "../controllers/instructor/deleteInstructor"
const router = Router();
router.get("/",getListInstructors);
router.get("/:instructorId",getInstructor);
router.get("/:instructorId/courses",getInstructorCourses );
router.post("/",createInstructor);
router.put("/:instructorId",updateInstructor);
router.delete("/:instructorId",deleteInstructor);

export default router;
