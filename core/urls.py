from django import views
from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('quiz/', views.quiz, name= "quiz"),
    # path('login/', views.login, name= "login"),
    path('quizzes/<int:id>/questions/', views.questions, name= "question"),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('authenticate/', views.authenticated, name='authenticated'),
    path('register/', views.register, name='register'),
    path('staff/upload/', views.upload, name='upload'),
    path('quizzes/<int:id>/edit/', views.quizEdit, name='edit-quiz'),
    path('staff/help/', views.quizHelper, name='helper'),
    path('quizzes/test/', views.userTest, name='user-test'),
    path('quizzes/user/responses/', views.userResponses, name='user-responses'),
    path('quizzes/user/timer/', views.userQuestionTimer, name='user-question-timer'),
    path('quizzes/user/timer-post/', views.userQuestionTimerSave, name='user-question-timer-post'),
]