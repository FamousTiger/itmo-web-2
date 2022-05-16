const message = document.getElementById('message');
const messages = document.getElementById('messages');

message.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    send();
  }
});

const chatSocket = io('/chat');

function send() {
  chatSocket.emit('message', message.value);
  message.value = '';
  message.focus();
}

chatSocket.on('connect', () => {
  console.log('socket connected');
});

chatSocket.on('disconnect', () => {
  console.log('socket disconnected');
});

chatSocket.on('message', (message) => {
  console.log('received:', message);
  receiveMessage(message);
});

function receiveMessage(message) {
  messages.appendChild(createMessage(message));
}

function createMessage(message) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(message));
  return li;
}
