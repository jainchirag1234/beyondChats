const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const scrapeOldestBlogs = require("./scraper/scrapeBlogs");
const articleRoutes = require("./routes/articleRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

app.use("/api/articles", articleRoutes);

app.listen(5000, async () => {
  console.log("Server running on port 5000");
  await scrapeOldestBlogs();
});
