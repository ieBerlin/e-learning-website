import { Request, Response } from "express";
import Course, { ICourse } from "../../models/Course";
import { Types } from "mongoose";

const updateCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { title, description, instructor_id, category_id, price, length } = req.body;

  try {
    // Validate input fields
    let errors: any = {};
    if (title && typeof title !== "string") {
      errors.title = "Title must be a string.";
    }
    if (description && typeof description !== "string") {
      errors.description = "Description must be a string.";
    }
    if (price && (isNaN(+price) || +price <= 0)) {
      errors.price = "Price must be a positive number.";
    }
    if (length && (isNaN(+length) || +length <= 0)) {
      errors.length = "Length must be a positive number.";
    }
    if (instructor_id && !Types.ObjectId.isValid(instructor_id)) {
      errors.instructor_id = "Invalid instructor ID format.";
    }
    if (category_id && !Types.ObjectId.isValid(category_id)) {
      errors.category_id = "Invalid category ID format.";
    }

    // Check for any validation errors
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Prepare update object with valid fields
    const updateFields: Partial<ICourse> = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (instructor_id) updateFields.instructor_id = new Types.ObjectId(instructor_id);
    if (category_id) updateFields.category_id = new Types.ObjectId(category_id);
    if (price) updateFields.price = +price;
    if (length) updateFields.length = +length;

    // Find and update the course by courseId
    const updatedCourse: ICourse | null = await Course.findByIdAndUpdate(
      courseId,
      updateFields,
      { new: true }
    );

    // Check if the course exists
    if (!updatedCourse) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Return the updated course
    res.status(200).json({ success: true, course: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error.message);
    res.status(500).json({ success: false, message: "Error updating course" });
  }
};

export default updateCourse;
