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

    // Log to debug in Netlify if needed
    console.log("OpenAI response:", JSON.stringify(data));

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: "❌ AI did not respond. Check your API key or request format." })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (err) {
    console.error("OpenAI API error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "❌ Server error. Try again later." })
    };
  }
};
