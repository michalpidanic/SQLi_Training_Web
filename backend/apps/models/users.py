from django.db import models


class Users(models.Model):
    user_id = models.IntegerField()
    username = models.CharField(primary_key=True, max_length=100)
    password = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    user_info = models.CharField(max_length=100)

    def __str__(self):
        return self.username
