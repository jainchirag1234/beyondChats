const axios = require("../utils/axiosInstance");
const cheerio = require("cheerio");

async function scrapeContent(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let content = "";
  $("p").each((_, el) => {
    content += $(el).text() + "\n";
  });

  return content.substring(0, 3000); // limit text
}

module.exports = { scrapeContent };
