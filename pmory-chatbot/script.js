async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  chatbox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;

  try {
    const res = await fetch("/.netlify/functions/ask-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!res.ok) throw new Error("API request failed");

    const data = await res.json();
    chatbox.innerHTML += `<p><strong>PMory:</strong> ${data.reply}</p>`;
  } catch (err) {
    console.error(err);
    chatbox.innerHTML += `<p style="color:red;"><strong>Error:</strong> Failed to get response.</p>`;
  }

  input.value = "";
}
