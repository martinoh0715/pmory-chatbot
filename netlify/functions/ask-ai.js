exports.handler = async function(event, context) {
  try {
    const { message } = JSON.parse(event.body);

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    console.log("🔑 OpenAI Key exists:", !!OPENAI_API_KEY); // Log if key is found

    if (!OPENAI_API_KEY) {
      throw new Error("Missing OpenAI API Key in environment variables");
    }

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
    console.log("✅ OpenAI API response:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };
  } catch (err) {
    console.error("❌ Error in ask-ai.js:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "❌ Failed to get response from AI." })
    };
  }
};
