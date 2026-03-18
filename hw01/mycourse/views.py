from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from .models import Course_table

# 新增課程的 API
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

# 查詢課程列表的 API (已更新為老師要求的 JsonResponse)
@api_view(['GET'])
def courselist(request):
    courses = Course_table.objects.all().values()
    return JsonResponse(list(courses), safe=False)