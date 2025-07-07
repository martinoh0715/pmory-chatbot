exports.handler = async function(event, context) {
  try {
    const { message } = JSON.parse(event.body);
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      console.log("❌ No OpenAI API key found in environment variables.");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing OpenAI API key." })
      };
    }

    const apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
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

    const data = await apiResponse.json();

    if (data.error) {
      console.log("OpenAI API error:", data.error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: data.error.message || "OpenAI API error" })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };

  } catch (error) {
    console.error("Function Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error occurred." })
    };
  }
};
