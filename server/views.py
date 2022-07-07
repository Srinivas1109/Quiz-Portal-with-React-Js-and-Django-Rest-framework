from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response

def Home(req):
    return JsonResponse("Home Page", safe= False)