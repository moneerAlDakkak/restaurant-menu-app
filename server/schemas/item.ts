import mongoose from "mongoose";

export interface ITEM {
  name: string;
  price: number;
  discount?: number;
  _id?: string;
  localId?: string;
}

export const ItemSchema = new mongoose.Schema<ITEM>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
});
