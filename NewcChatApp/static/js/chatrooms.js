document.addEventListener('DOMContentLoaded', function() {
    var chatList = document.getElementById('chatList');
    var createChatButton = document.getElementById('createChatButton');
    var editChatButton = document.getElementById('editChatButton');
    var deleteChatButton = document.getElementById('deleteChatButton');

    createChatButton.addEventListener('click', function() {

        window.location.href = 'create_chat.html';
    });

    editChatButton.addEventListener('click', function() {

        var selectedChat = chatList.value;

        window.location.href = 'edit_chat.html?chat=' + encodeURIComponent(selectedChat);
    });

    deleteChatButton.addEventListener('click', function() {

        var selectedChat = chatList.value;

        fetch('/api/chatrooms/' + encodeURIComponent(selectedChat), {
            method: 'DELETE'
        })
        .then(function(response) {
            if (response.ok) {
                console.log('Чат успешно удален');
            } else {
                console.log('Ошибка при удалении чата:', response.statusText);
            }
        })
        .catch(function(error) {
            console.log('Ошибка при удалении чата:', error);
        });
    });

    fetch('/api/chatrooms')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            data.forEach(function(chat) {
                var option = document.createElement('option');
                option.value = chat.name;
                option.text = chat.name;
                chatList.appendChild(option);
            });
        })
        .catch(function(error) {
            console.log('Ошибка при получении списка групповых чатов:', error);
        });
});