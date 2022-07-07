from .models import Question, Quiz, Choice, CorrectChoice, Profile
from django.contrib.auth.models import User
from .serializers import ProfileSerializer, QuizSerializer, QuestionSerializer, ChoiceSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

import json

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.models import User

# Testing
from .serializers import UserSerializer
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        # token['address'] = user.profile_set.address
        user_profile = User.objects.filter(username= user).first()
        # print(user_profile)
        profile = Profile.objects.filter(user= user_profile).first()
        token['username'] = user.username
        token['isStaff'] = user.is_staff
        token['email'] = user.email
        token['firstname'] = user.first_name
        token['lastname'] = user.last_name
        token['mobileNo'] = profile.mobileNo
        token['address'] = profile.address
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def quiz(req):
    all_quizzes = Quiz.objects.all()
    serializer = QuizSerializer(all_quizzes, many=True)

    return Response(serializer.data)

# Returns all the questions based on the quiz selected


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def questions(req, id):
    all_questions = Question.objects.all()
    question_serializer = QuestionSerializer(all_questions, many=True)
    jsonQuestions = question_serializer.data

    for index, question in enumerate(jsonQuestions):
        # print(jsonQuestions[index]["pk"])
        options = Choice.objects.filter(relatedTo=jsonQuestions[index]["id"])
        choice_serializer = ChoiceSerializer(options, many=True)
        jsonOptions = choice_serializer.data
        jsonQuestions[index]["options"] = jsonOptions
        # print(question)

    # return JsonResponse({'Questions': jsonQuestions})
    return Response(jsonQuestions)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def authenticated(req):
    return Response(req.user)

# to be include in try catch


@api_view(['POST'])
def register(req):
    if req.method == 'POST':
        data = JSONParser().parse(req)

        serializer = UserSerializer(data=data)
        profileSerializer = ProfileSerializer(data= data)
        
        if serializer.is_valid() and profileSerializer.is_valid():
            user = User(
                first_name = serializer.data['first_name'],
                last_name = serializer.data['last_name'],
                email = serializer.data['email'],
                username = serializer.data['username'],
            )
            # print(user)
            profile = Profile(
                user= user,
                address= profileSerializer.data['address'],
                mobileNo= profileSerializer.data['mobileNo']
            )
            user.set_password(data['password'])

            user.save()
            profile.save()


            return Response({"success": serializer.data, "status": status.HTTP_201_CREATED})
        return Response({"success": serializer.errors, "status": status.HTTP_400_BAD_REQUEST})
