import mongoose from "mongoose";
import { ITEM, ItemSchema } from "./item";

interface SUB_CATEGORY {
  name: string;
  subCategories?: SUB_CATEGORY[];
  items?: ITEM[];
  discount?: number;
  _id?: string;
  localId?: string;
}

const SubCategorySchema4 = new mongoose.Schema<SUB_CATEGORY>({
  name: { type: String, required: true },
  items: { type: [ItemSchema] },
  discount: { type: Number, default: 0 },
});

const SubCategorySchema3 = new mongoose.Schema<SUB_CATEGORY>({
  name: { type: String, required: true },
  subCategories: { type: [SubCategorySchema4] },
  items: { type: [ItemSchema] },
  discount: { type: Number, default: 0 },
});

const SubCategorySchema2 = new mongoose.Schema<SUB_CATEGORY>({
  name: { type: String, required: true },
  subCategories: { type: [SubCategorySchema3] },
  items: { type: [ItemSchema] },
  discount: { type: Number, default: 0 },
});

const SubCategorySchema1 = new mongoose.Schema<SUB_CATEGORY>({
  name: { type: String, required: true },
  subCategories: { type: [SubCategorySchema2] },
  items: { type: [ItemSchema] },
  discount: { type: Number, default: 0 },
});

export { SubCategorySchema1, SUB_CATEGORY };
