const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateUpdatedArticle(original, ref1, ref2) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a professional SEO content writer.",
      },
      {
        role: "user",
        content: `
Original Article:
${original}

Reference Article 1:
${ref1}

Reference Article 2:
${ref2}

Rewrite the original article with improved formatting, SEO optimization, 
and content style similar to reference articles.
`,
      },
    ],
  });

  return response.choices[0].message.content;
}

module.exports = { generateUpdatedArticle };
