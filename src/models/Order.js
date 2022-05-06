import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  products: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date,
  },
  file: {
    type: String,
  },
  user: {
    type: String,
  },
});

export default model("Order", orderSchema);
