import { Router } from "express";
import createCourse from "../controllers/course/createCourse";
import getAllCourses from "../controllers/course/getAllCourses";
import getCourseById from "../controllers/course/getCourseById";
import updateCourse from "../controllers/course/updateCourse";
import deleteCourse from "../controllers/course/deleteCourse";
const router = Router();
router.get("/", getAllCourses);
router.get("/:courseId", getCourseById);
router.post("/", createCourse);
// router.post("/:courseId/materials");
router.put("/:courseId", updateCourse);
router.delete("/:courseId", deleteCourse);

export default router;
