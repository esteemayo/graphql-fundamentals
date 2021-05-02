import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./app";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION 🔥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

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
  .then(() => console.log(`Connected to MongoDB → ${db}`));

const PORT = process.env.PORT || 7070;

const server = app.listen(PORT, () =>
  console.log(`Server running at port → ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 🔥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
