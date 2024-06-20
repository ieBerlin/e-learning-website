import { Document, model, Schema } from "mongoose";

enum FieldName {
  Speaking = "speaking",
  Writing = "writing",
  Listening = "listening",
  Other = "other",
}

export interface IFieldCategory extends Document {
  name: FieldName;
  createdAt: Date;
  updatedAt: Date;
}

const FieldCategorySchema: Schema = new Schema<IFieldCategory>(
  {
    name: {
      type: String,
      enum: Object.values(FieldName),
      required: true,
      unique: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const FieldCategory = model<IFieldCategory>(
  "FieldCategory",
  FieldCategorySchema
);

export default FieldCategory;
