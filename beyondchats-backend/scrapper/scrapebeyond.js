const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/Article");

const BASE_URL = "https://beyondchats.com/blogs/";

async function scrapeOldestBlogs() {
  const res = await axios.get(BASE_URL);
  const $ = cheerio.load(res.data);

  // get last 5 articles
  const articles = $(".blog-item").slice(-5);

  for (let el of articles) {
    const title = $(el).find("h3").text().trim();
    const link = $(el).find("a").attr("href");

    const articlePage = await axios.get(link);
    const $$ = cheerio.load(articlePage.data);
    const content = $$(".blog-content").text().trim();

    await Article.create({
      title,
      content,
      url: link,
    });
  }

  console.log("✅ Oldest articles scraped");
}

module.exports = scrapeOldestBlogs;
