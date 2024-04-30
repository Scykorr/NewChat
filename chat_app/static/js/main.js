var currentUser = null;
var currentChat = null;

function login() {
  var username = document.getElementById('username').value;
  var avatarFile = document.getElementById('avatar').files[0];
  var avatarLink = document.getElementById('avatarLink').value;

  if (username) {
    var formData = new FormData();
    formData.append('username', username);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    if (avatarLink) {
      formData.append('avatarLink', avatarLink);
    }

    fetch('login-url', {
      method: 'POST',
      body: formData
    })
      .then(function(response) {
        if (response.ok) {
          window.location.href = 'users.html';
        } else {
          console.error('Login failed.');
        }
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
  } else {
    alert('Please enter your username');
  }
}

document.getElementById('loginButton').addEventListener('click', login);