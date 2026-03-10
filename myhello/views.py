from django.http import HttpResponse

def myIndex(request):
    # 取得 URL 參數 name，若沒有則預設為 "CGU"
    my_name = request.GET.get('name', "CGU")
    return HttpResponse("Hello " + my_name)