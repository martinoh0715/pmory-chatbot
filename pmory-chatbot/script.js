const chatlog = document.getElementById('chatlog');
const userInput = document.getElementById('userInput');

// ✅ Auto welcome message
window.onload = () => {
  displayBotMessage("👋 Hi! I'm PMory, your AI mentor for Product Management. Ask me anything to get started!");
};

// ✅ Enter key support
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

async function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') return;

  appendMessage("You", message);
  userInput.value = '';

  try {
    const response = await fetch('/.netlify/functions/ask-ai', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    displayBotMessage(data.reply || 'Sorry, no response.');
  } catch (error) {
    displayBotMessage('⚠️ Error: Failed to get response.');
  }
}

function appendMessage(sender, message) {
  const div = document.createElement('div');
  div.classList.add('user');
  div.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatlog.appendChild(div);
  chatlog.scrollTop = chatlog.scrollHeight;
}

function displayBotMessage(text) {
  const wrapper = document.createElement('div');
  wrapper.className = 'bot-msg';

  const profileImg = document.createElement('img');
  profileImg.src = 'pmory-logo.png'; // ✅ must be same as uploaded filename
  profileImg.alt = 'PMory';

  const textDiv = document.createElement('div');
  textDiv.className = 'bot-text';
  textDiv.innerText = text;

  wrapper.appendChild(profileImg);
  wrapper.appendChild(textDiv);
  chatlog.appendChild(wrapper);
  chatlog.scrollTop = chatlog.scrollHeight;
}
