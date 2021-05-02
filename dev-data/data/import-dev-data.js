import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";

// Models
import Item from "../../models/Item";
import User from "../../models/User";
import Post from "../../models/Post";

dotenv.config({ path: "./config.env" });

// Database local
const db = process.env.DATABASE_LOCAL;

// MongoDB connection
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Connected to MongoDB → ${db}`))
  .catch((err) => console.error(err));

// Read JSON file
const items = JSON.parse(fs.readFileSync(`${__dirname}/items.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const posts = JSON.parse(fs.readFileSync(`${__dirname}/posts.json`, "utf-8"));

// Import data into DB
const importData = async () => {
  try {
    await Item.create(items);
    await User.create(users);
    await Post.create(posts);

    console.log("👍👍👍Data successfully loaded! 👍👍👍");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

// Delete all data in the DB
const deleteData = async () => {
  try {
    console.log("😢😢 Goodbye Data...");

    await Item.deleteMany();
    await User.deleteMany();
    await Post.deleteMany();

    console.log(
      "Data successfully deleted! To load sample data, run\n\n\t npm run sample\n\n"
    );
    process.exit();
  } catch (err) {
    console.log(
      "\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n"
    );
    console.error(err);
    process.exit();
  }
};

if (process.argv.includes("--delete")) {
  deleteData();
} else {
  importData();
}
