import mongoose from "mongoose";
import { SUB_CATEGORY, SubCategorySchema1 } from "./subCategory";
import { ITEM, ItemSchema } from "./item";

interface CATEGORY {
  name: string;
  subCategories?: SUB_CATEGORY[];
  items?: ITEM[];
  discount?: number;
  _id?: string;
  localId?: string;
}

const CategorySchema = new mongoose.Schema<CATEGORY>({
  name: { type: String, required: true },
  subCategories: { type: [SubCategorySchema1] },
  items: { type: [ItemSchema] },
  discount: { type: Number, default: 0 },
});

export { CategorySchema, CATEGORY };
