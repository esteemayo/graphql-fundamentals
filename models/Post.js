import { model, Schema } from "mongoose";

const postSchema = new Schema({
  title: String,
  text: String,
  createdAt: String,
});

const Post = model("Post", postSchema);

export default Post;
