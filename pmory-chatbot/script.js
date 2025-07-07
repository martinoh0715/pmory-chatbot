async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value;
  if (!message) return;

  const chatbox = document.getElementById("chatbox");
  chatbox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;

  const res = await fetch("/.netlify/functions/ask-ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  chatbox.innerHTML += `<p><strong>PMory:</strong> ${data.reply}</p>`;
  input.value = "";
}
