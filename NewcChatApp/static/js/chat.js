var currentUser = null;
var currentChat = null;

function login() {
  var username = document.getElementById('username').value;
  var avatar = document.getElementById('avatar').value;
  var avatarLink = document.getElementById('avatarLink').value;

  if (username) {
    currentUser = {
      username: username,
      avatar: avatar,
      avatarLink: avatarLink
    };

    document.getElementById('usernameDisplay').textContent = currentUser.username;
    document.getElementById('avatarDisplay').src = currentUser.avatar ? currentUser.avatar : currentUser.avatarLink;

    getUserList();
    getChatList();

    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('messengerSection').style.display = 'block';
  } else {
    alert('Please enter your username');
  }
}

function getUserList() {
  fetch('/api/users')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        var userList = document.getElementById('userList');
        userList.innerHTML = '';

        data.users.forEach(user => {
          var option = document.createElement('option');
          option.text = user.username;
          option.value = user.username;
          userList.add(option);
        });
      } else {
        alert('Failed to get user list. Please try again later.');
      }
    })
    .catch(error => {
      console.error('An error occurred while getting user list:', error);
      alert('An error occurred while getting user list. Please try again later.');
    });
}

function getChatList() {
  fetch('/api/chats')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        var chatList = document.getElementById('chatList');
        chatList.innerHTML = '';

        data.chats.forEach(chat => {
          var option = document.createElement('option');
          option.text = chat.name;
          option.value = chat.id;
          chatList.add(option);
        });
      } else {
        alert('Failed to get chat list. Please try again later.');
      }
    })
    .catch(error => {
      console.error('An error occurred while getting chat list:', error);
      alert('An error occurred while getting chat list. Please try again later.');
    });
}

document.getElementById('loginButton').addEventListener('click', login);

document.getElementById('joinChatButton').addEventListener('click', function() {
  var chatList = document.getElementById('chatList');
  var selectedChatId = chatList.value;

  if (selectedChatId) {


    fetch('/api/chats/' + selectedChatId + '/join', {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          currentChat = data.chat;
          alert('Joined chat: ' + currentChat.name);
        } else {
          alert('Failed to join chat. Please try again later.');
        }
      })
      .catch(error => {
        console.error('An error occurred while joining chat:', error);
        alert('An error occurred while joining chat. Please try again later.');
      });
  } else {
    alert('Please select a chat to join');
  }
});

document.getElementById('sendMessageButton').addEventListener('click', function() {
  var recipientList = document.getElementById('recipientList');
  var selectedRecipient = recipientList.value;
  var messageText = document.getElementById('messageText').value;

  if (selectedRecipient && messageText) {

    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipient: selectedRecipient,
        message: messageText
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Message sent to: ' + selectedRecipient);
        } else {
          alert('Failed to send message. Please try again later.');
        }
      })
      .catch(error => {
        console.error('An error occurred while sending message:', error);
        alert('An error occurred while sending message. Please try again later.');
      });
  } else {
    alert('Please select a recipient and enter a message');
  }
});

document.getElementById('editProfileButton').addEventListener('click', function() {
  var newUsername = document.getElementById('newUsername').value;
  var newAvatar = document.getElementById('newAvatar').value;


  fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: newUsername,
      avatar: newAvatar
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        currentUser.username = newUsername;
        currentUser.avatar = newAvatar;
        alert('Profile updated');
      } else {
        alert('Failed to update profile. Please try again later.');
      }
    })
    .catch(error => {
      console.error('An error occurred while updating profile:', error);
      alert('An error occurred while updating profile. Please try again later.');
    });
});

function init() {
  if (currentUser) {

    document.getElementById('usernameDisplay').textContent = currentUser.username;
    document.getElementById('avatarDisplay').src = currentUser.avatar ? currentUser.avatar : currentUser.avatarLink;

    getUserList();
    getChatList();

    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('messengerSection').style.display = 'block';
  }
}

init();