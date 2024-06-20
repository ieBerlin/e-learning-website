import { Router } from "express";
import createStudent from "../controllers/student/createStudent";
import getAllStudents from "../controllers/student/getAllStudents";
import getStudentById from "../controllers/student/getStudentById";
import updateStudent from "../controllers/student/updateStudent";
import deleteStudent from "../controllers/student/deleteStudent";

const router = Router();
router.post("/", createStudent);
router.get("/", getAllStudents);
router.get("/:studentId", getStudentById);
router.put("/:studentId", updateStudent);
router.delete("/:studentId", deleteStudent);

export default router;
