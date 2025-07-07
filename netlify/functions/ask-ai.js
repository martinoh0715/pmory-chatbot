const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const { message } = JSON.parse(event.body);
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("OpenAI API error:", data.error);
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: `OpenAI Error: ${data.error.message}` })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };
  } catch (error) {
    console.error("Server error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Server error. Please try again later." })
    };
  }
};
