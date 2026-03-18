from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.serializers.json import DjangoJSONEncoder
import json
from .models import Post

# 1. 新增資料的 API (對應 P.28)
@api_view(['GET'])
def add_post(request):
    title = request.GET.get('title', '')
    content = request.GET.get('content', '')
    photo = request.GET.get('photo', '')
    location = request.GET.get('location', '')
    
    new_post = Post()
    new_post.title = title
    new_post.content = content
    new_post.photo = photo
    new_post.location = location
    new_post.save()
    
    return Response({"data": title + " insert!"}, status=status.HTTP_200_OK)

# 2. 查詢資料的 API (重點！完全對應 P.32)
@api_view(['GET'])
def list_post(request):
    posts = Post.objects.all().values()
    
    return Response({"data":
        json.dumps(
            list(posts),
            sort_keys = True,
            indent = 1,
            cls = DjangoJSONEncoder)},
        status=status.HTTP_200_OK)