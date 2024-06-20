import { Document, model, Schema } from "mongoose";

enum LanguageName {
  French = "french",
  English = "english",
  German = "german",
}

export interface ILanguageCategory extends Document {
  name: LanguageName;
  createdAt: Date;
  updatedAt: Date;
}

const LanguageCategorySchema: Schema = new Schema<ILanguageCategory>(
  {
    name: {
      type: String,
      enum: Object.values(LanguageName),
      required: true,
      unique: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const LanguageCategory = model<ILanguageCategory>(
  "LanguageCategory",
  LanguageCategorySchema,
  "LanguageCategories"
);

export default LanguageCategory;
