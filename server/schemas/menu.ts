import mongoose from "mongoose";
import { CATEGORY, CategorySchema } from "./category";

export interface MENU {
  name?: string;
  description?: string;
  categories: CATEGORY[];
  discount?: number;
}

const MenuSchema = new mongoose.Schema<MENU>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  categories: [CategorySchema],
  discount: { type: Number, default: 0 },
});

const MeunModel = mongoose.model("menu", MenuSchema);
export default MeunModel;
