const chatbox = document.getElementById("chatbox");
const input = document.getElementById("userInput");

async function sendMessage() {
  const userText = input.value;
  if (!userText) return;

  chatbox.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
  input.value = "";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_OPENAI_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userText }]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Something went wrong.";

  chatbox.innerHTML += `<p><strong>PMory:</strong> ${reply}</p>`;
  chatbox.scrollTop = chatbox.scrollHeight;
}
