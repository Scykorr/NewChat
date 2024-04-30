from django.db import models

class User(models.Model):
    name = models.CharField(max_length=64)
    avatar = models.ImageField(upload_to='avatars/')

class GroupChat(models.Model):
    name = models.CharField(max_length=64)
    members = models.ManyToManyField(User)

class Message(models.Model):
    text = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    groupChat = models.ForeignKey(GroupChat, on_delete=models.CASCADE, default=1)
    dateCreation = models.DateTimeField(auto_now_add=True)


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    dateCreation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message
