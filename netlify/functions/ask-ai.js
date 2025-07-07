const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  try {
    const { message } = JSON.parse(event.body);

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      console.error("❌ Missing OPENAI_API_KEY in environment variables");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing API key" }),
      };
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      console.error("❌ Invalid OpenAI API response:", data);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Invalid OpenAI response" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content }),
    };
  } catch (err) {
    console.error("❌ Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Function error" }),
    };
  }
};
