from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.serializers.json import DjangoJSONEncoder
import json
from .models import Course_table

# 1. 新增課程的 API
@api_view(['GET'])
def addcourse(request):
    department = request.GET.get('Department', '')
    course_title = request.GET.get('CourseTitle', '')
    instructor = request.GET.get('Instructor', '')
    
    new_course = Course_table()
    new_course.Department = department
    new_course.CourseTitle = course_title
    new_course.Instructor = instructor
    new_course.save()
    
    return Response({"data": course_title + " insert!"}, status=status.HTTP_200_OK)

# 2. 查詢課程列表的 API
@api_view(['GET'])
def courselist(request):
    courses = Course_table.objects.all().values()
    return Response({"data":
        json.dumps(
            list(courses),
            sort_keys = True,
            indent = 1,
            cls = DjangoJSONEncoder)},
        status=status.HTTP_200_OK)