async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("You", message, true);
  input.value = "";

  try {
    const response = await fetch("/.netlify/functions/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    if (data.reply) {
      appendMessage("PMory", data.reply, false);
    } else {
      appendMessage("Error", "Something went wrong. No reply returned.", false);
    }
  } catch (error) {
    appendMessage("Error", "Failed to get response.", false);
  }
}

function appendMessage(sender, message, isUser) {
  const chatbox = document.getElementById("chatbox");
  const messageElement = document.createElement("div");
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  messageElement.classList.add("message", isUser ? "user" : "bot");
  messageElement.innerHTML = `<strong>${sender}</strong> <small>${timestamp}</small><br>${message}`;
  chatbox.appendChild(messageElement);
  chatbox.scrollTop = chatbox.scrollHeight;
}

document.getElementById("userInput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});

window.onload = function () {
  appendMessage("PMory", "👋 Hi! I’m PMory, your AI mentor for Product Management. Ask me anything to get started!", false);
};
