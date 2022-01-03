const socket = io();
$.ajax({
        url:"/api/index",
        method:"get",
      success: (data) => {
        const username = data.username
        const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
        const room = window.location.href.slice(43);
        // Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  if(window.location.href.slice(43)==="")
  {document.getElementById('room-name').innerText ="Looby"}
  else{
  document.getElementById('room-name').innerText = room;}
  outputUsers(users);
});
        // Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span> ${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// // Add room name to DOM
// function outputRoomName(room) {
//   document.getElementById('room-name').innerText = room;
// }

// Add users to DOM
function outputUsers(users) {
  document.getElementById('users').innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    document.getElementById('users').appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index/chatroom';
  } else {
  }
}); 
        },
        error:(err)=>{
            console.log(err)
        }
    })
