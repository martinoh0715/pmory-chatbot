async function sendMessageToAI(userMessage) {
  const res = await fetch("/.netlify/functions/ask-ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await res.json();
  return data.reply;
}

// Example use:
sendMessageToAI("What are top PM skills?").then(reply => {
  console.log("AI replied:", reply);
  // You can also display the reply in your chat box
});
