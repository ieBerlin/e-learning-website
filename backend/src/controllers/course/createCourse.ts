import { Request, Response } from "express";
import Course, { ICourse } from "../../models/Course";
import { Types } from "mongoose";
import Instructor from "../../models/Instructor";
import ValidationError from "../../utils/ValidationError";

const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, instructor_id, category_id, price, length } =
      req.body;
    let errors: ValidationError[] = [];
    if (!title || !(typeof title === "string")) {
      errors.push({ field: "title", message: "Title is required." });
    }
    if (!description || !(typeof description === "string")) {
      errors.push({
        field: "description",
        message: "Description is required.",
      });
    }
    if (price) {
      if (+price <= 0 || Number.isNaN(+price)) {
        errors.push({
          field: "price",
          message: "Invalid price. Price must be a positive number.",
        });
      }
    }
    if (length) {
      if (+length <= 0 || Number.isNaN(+length)) {
        errors.push({
          field: "length",
          message: "Invalid length. Length must be a positive number.",
        });
      }
    }

    if (!instructor_id && !Types.ObjectId.isValid(instructor_id)) {
      errors.push({
        field: "instructor_id",
        message: "Invalid instructor ID format.",
      });
    }

    if (!category_id || !Types.ObjectId.isValid(category_id)) {
      errors.push({
        field: "category_id",
        message: "Invalid category ID format.",
      });
    }
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    let instructor: any = null;
    if (instructor_id) {
      const instructorId = new Types.ObjectId(instructor_id);
      instructor = await Instructor.findOne({ userId: instructorId });
      if (!instructor) {
        return res
          .status(404)
          .json({ success: false, message: "Instructor not found." });
      }
    }

    // Create a new Course instance
    const newCourse: ICourse = new Course({
      title,
      description,
      instructor_id: instructor ? instructor.userId : null,
      category_id: category_id ? new Types.ObjectId(category_id) : null,
      price: +price,
      length: +length,
    });

    // Save the course to the database
    const savedCourse = await newCourse.save();

    // Respond with success message and the saved course data
    res.status(201).json({ success: true, course: savedCourse });
  } catch (error) {
    console.error("Error creating course:", error.message);
    res.status(500).json({ success: false, message: "Error creating course" });
  }
};

export default createCourse;
