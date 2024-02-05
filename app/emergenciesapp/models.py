from django.db import models
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.db.models.signals import post_save
class message(models.Model):
    type = models.CharField(max_length=500)
    lat = models.FloatField()
    lon = models.FloatField()
    location = models.CharField(max_length=500)
    message = models.CharField(max_length=500)
    level = models.CharField(max_length=500)
    class Meta:
        db_table = 'emergencies'
