import { model, Schema } from "mongoose";

const itemSchema = new Schema({
  text: String,
  time: Number,
  timeISO: String,
  title: {
    type: String,
    required: true,
  },
  deleted: Boolean,
});

const Item = model("Item", itemSchema);

export default Item;
