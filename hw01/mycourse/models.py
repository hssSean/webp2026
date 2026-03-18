from django.db import models

class Course_table(models.Model):
    Department = models.CharField(max_length=100)  # 開課單位
    CourseTitle = models.CharField(max_length=100) # 課程名稱
    Instructor = models.CharField(max_length=100)  # 授課教師