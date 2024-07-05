import { Request, Response } from "express";
import Course, { ICourse } from "../../models/Course";
import { Types } from "mongoose";
import ValidationError from "../../utils/ValidationError";

const updateCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { title, description, instructor_id, category_id, price, length } =
    req.body;

  try {
    const errors: ValidationError[] = [];

    if (title && typeof title !== "string") {
      errors.push({ field: "title", message: "Title must be a string." });
    }
    if (description && typeof description !== "string") {
      errors.push({
        field: "description",
        message: "Description must be a string.",
      });
    }
    if (price) {
      if (isNaN(+price) || +price <= 0) {
        errors.push({
          field: "price",
          message: "Price must be a positive number.",
        });
      }
    }
    if (length) {
      if (isNaN(+length) || +length <= 0) {
        errors.push({
          field: "length",
          message: "Length must be a positive number.",
        });
      }
    }
    if (!instructor_id || !Types.ObjectId.isValid(instructor_id)) {
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

    const updateFields: Partial<ICourse> = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (instructor_id) updateFields.instructor_id = instructor_id;
    if (category_id) updateFields.category_id = category_id;
    if (price) updateFields.price = +price;
    if (length) updateFields.length = +length;
    const updatedCourse: ICourse | null = await Course.findByIdAndUpdate(
      courseId,
      updateFields,
      { new: true }
    );

    if (!updatedCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // Return the updated course
    res.status(200).json({ success: true, course: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error.message);
    res.status(500).json({ success: false, message: "Error updating course" });
  }
};

export default updateCourse;
