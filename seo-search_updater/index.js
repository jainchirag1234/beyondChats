require("dotenv").config();

const { fetchArticle } = require("./services/articleService");
const { searchGoogle } = require("./services/googleSearchService");
const { scrapeContent } = require("./services/scraperService");
const { generateUpdatedArticle } = require("./services/llmService");
const { publishArticle } = require("./services/publishService");

async function run(articleId) {
  console.log("Fetching original article...");
  const article = await fetchArticle(articleId);

  console.log("Searching Google...");
  const links = await searchGoogle(article.title);

  console.log("Scraping reference articles...");
  const ref1 = await scrapeContent(links[0].link);
  const ref2 = await scrapeContent(links[1].link);

  console.log("Generating updated article...");
  const updatedContent = await generateUpdatedArticle(
    article.content,
    ref1,
    ref2
  );

  const finalArticle = {
    title: article.title,
    content:
      updatedContent +
      `
    
References:
1. ${links[0].link}
2. ${links[1].link}
    `,
  };

  console.log("Publishing article...");
  await publishArticle(finalArticle);

  console.log("✅ Article published successfully");
}

run(1);
