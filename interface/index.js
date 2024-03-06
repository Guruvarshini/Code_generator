const inputField = document.getElementById("inputText"); // Changed class to ID
const button = document.getElementById("generate"); // Changed class to ID
const outputTextarea = document.getElementById("outputText"); // Changed class to ID

button.addEventListener("click", sendMessage);

inputField.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = inputField.value;
  fetch('http://localhost:3000/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: message })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    outputTextarea.value = data.message.content; // Changed to outputTextarea
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
}
