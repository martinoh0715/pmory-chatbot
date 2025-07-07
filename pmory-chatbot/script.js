const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

function addMessage(message, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);

  if (sender === 'bot') {
    const profileImg = document.createElement('img');
    profileImg.src = 'pmory-logo.png'; // make sure the image is in the same directory
    profileImg.alt = 'PMory';
    profileImg.classList.add('bot-avatar');
    messageDiv.appendChild(profileImg);
  }

  const messageText = document.createElement('div');
  messageText.textContent = message;
  messageDiv.appendChild(messageText);

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  userInput.value = '';

  try {
    const res = await fetch('/.netlify/functions/ask-ai', {
      method: 'POST',
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    if (data.reply) {
      addMessage(data.reply, 'bot');
    } else {
      addMessage('Error: No response from server.', 'bot');
    }
  } catch (error) {
    addMessage('Error: Failed to get response.', 'bot');
  }
}

sendButton.addEventListener('click', sendMessage);

userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

window.onload = () => {
  addMessage("👋 Hi! I'm PMory, your AI mentor for Product Management. Ask me anything to get started!", 'bot');
};
