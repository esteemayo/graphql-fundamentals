import { model, Schema } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: String,
  age: {
    type: Number,
    required: true,
  },
  gender: String,
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  ],
  createdAt: String,
});

const User = model("User", userSchema);

export default User;
