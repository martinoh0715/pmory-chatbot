async function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (!message) return;

  addMessage("You", message, false);
  input.value = "";

  try {
    const response = await fetch("/.netlify/functions/ask-ai", {
      method: "POST",
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    addMessage("PMory", data.reply, true);
  } catch (error) {
    addMessage("Error", "Failed to get response.", true);
  }
}

function addMessage(sender, text, isBot = false) {
  const chatbox = document.getElementById("chatbox");
  const messageEl = document.createElement("div");
  messageEl.classList.add("message");

  if (isBot) {
    messageEl.innerHTML = `
      <div class="bot-container">
        <img src="pmory-logo.png" alt="PMory Logo" class="bot-avatar" />
        <div class="bot-text">${text}</div>
      </div>
    `;
  } else {
    messageEl.innerHTML = `<span class="user-message">${sender}:</span> ${text}`;
  }

  chatbox.appendChild(messageEl);
  chatbox.scrollTop = chatbox.scrollHeight;
}
