# -- coding: utf8 --
from django.db import models

class News(models.Model):
    title = models.CharField()
    url = models.CharField()
    pubDate = models.DateTimeField()
    location = models.IntegerField()
    content = models.TextField()
    topics_id = models.CharField()
    class Meta:
        db_table = 'news'

