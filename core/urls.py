from django import views
from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('quiz/', views.quiz, name= "quiz"),
    # path('login/', views.login, name= "login"),
    path('<str:id>/questions/', views.questions, name= "question"),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('authenticate/', views.authenticated, name='authenticated'),
    path('register/', views.register, name='register'),

]