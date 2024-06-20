import { Request, Response } from "express";
import Course, { ICourse } from "../../models/Course";
import { Types } from "mongoose";
import Instructor from "../../models/Instructor";

interface ErrorInterface {
  title?: string;
  description?: string;
  instructor_id?: string;
  category_id?: string;
  length?: string;
  price?: string;
}

const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, instructor_id, category_id, price, length } =
      req.body;

    let errors: ErrorInterface = {};

    // Basic validations
    if (!title) {
      errors.title = "Title is required.";
    }
    if (!description) {
      errors.description = "Description is required.";
    }
    if (!price || +price <= 0 || Number.isNaN(+price)) {
      errors.price = "Invalid price. Price must be a positive number.";
    }
    if (!length || +length <= 0 || Number.isNaN(+length)) {
      errors.length = "Invalid length. Length must be a positive number.";
    }

    // Validate instructor ID format (if provided)
    if (instructor_id && !Types.ObjectId.isValid(instructor_id)) {
      errors.instructor_id = "Invalid instructor ID format.";
    }

    // Validate category ID format (if provided)
    if (category_id && (!Types.ObjectId.isValid(category_id) || Number.isNaN(+category_id))) {
      errors.category_id = "Invalid category ID format.";
    }

    // Check for any validation errors
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Find instructor by userId
    let instructor: any = null;
    if (instructor_id) {
      const instructorId = new Types.ObjectId(instructor_id);
      instructor = await Instructor.findOne({ userId: instructorId });
      if (!instructor) {
        return res.status(404).json({ success: false, message: "Instructor not found." });
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
