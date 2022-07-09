from .models import Question, Quiz, Choice, CorrectChoice, Profile, ScheduleTime
from django.contrib.auth.models import User
from .serializers import ProfileSerializer, QuizSerializer, QuestionSerializer, ChoiceSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.models import User

# Testing
from .serializers import UserSerializer
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
import datetime

from core import serializers

# !! important
# Runtime warning in scheduleTime while adding the new schedule time for quiz

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
    quiz = Quiz.objects.get(id= id)
    all_questions = Question.objects.filter(relatedTo= quiz).order_by("-createdOn")
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

# to be include in try except


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

# Try and except to be implemented
@api_view(['POST'])
def upload(req):
    if req.method == 'POST':
        data = JSONParser().parse(req)
        quiz_exist = Quiz.objects.filter(title= data['quiz_name']).exists()
        # print(quiz_exist)
        print("data['quiz_scheduled']: ", data['quiz_scheduled'])
        # print(data['quiz_name'])
        quiz = None
        if(not quiz_exist):
            quiz = Quiz(
                title= data['quiz_name'], 
                scheduled= data['quiz_scheduled'],
                )
            # print("Quiz: ", quiz)
            quiz.save()
            if data['quiz_scheduled']:
                date_time = data['quiz_scheduled_time']
                date_time = datetime.datetime(date_time[0], date_time[1], date_time[2], date_time[3], date_time[4])
                schedule = ScheduleTime(
                    quiz= quiz,
                    schedule_datetime= date_time
                )
                schedule.save()
                # print(schedule)
            
        else:
            quiz = Quiz.objects.filter(title= data['quiz_name']).first()

        question = Question(
            relatedTo= quiz,
            question= data['question'],
            marks= int(data['marks']),
            isRadio= True if data['option_type'] == "singleCorrect" else False,
            isTextBox = True if data['option_type'] == "textBox" else False,
        )
        question.save()
        # print("Question: ", question)
        # print()

        if not question.isTextBox:
            for i in range(0, int(data['number_of_options'])):
                choice = Choice(
                    relatedTo= question,
                    choice= data['options'][i],
                )
                choice.save()
                # print(f'Choice{i+1}: ', choice)
                # print()
                # print(question.isRadio)
                # print(int(data['answer'])-1 == i )
                if question.isRadio and (int(data['answer'])-1 == i ):
                    answer = CorrectChoice(
                        question= question,
                        correctChoice= choice 
                    )
                    answer.save()
                    # print("Answer", answer)
                    # print()
                else:
                    for j in range(0, int(len(data['correctIndices']))):
                        if int(data['correctIndicies'][j]) == i:
                            answer = CorrectChoice(
                                question= question,
                                correctChoice= choice 
                            )
                            answer.save()
                            # print("Answers", answer)
        elif question.isTextBox:
            choice = Choice(
                relatedTo= question,
                choice= data['text_box_answer']
            )
            choice.save()

            answer = CorrectChoice(
                question= question,
                correctChoice= choice 
                )
            answer.save()
        
        
        return Response(
            {
            "status": status.HTTP_201_CREATED,
            "data_uploaded": question.question,
            "quiz_id": quiz.id,
        })

@api_view(['POST'])
def quizHelper(req):
    if req.method == "POST":
        data = JSONParser().parse(req)
        quiz_name = data['quiz_name']
        quiz = Quiz.objects.filter(title= quiz_name).exists()
        if quiz:
            quiz = Quiz.objects.filter(title= quiz_name).first()
            
            schedule_time = ScheduleTime.objects.filter(quiz= quiz).exists()
            if schedule_time:
                schedule_time = ScheduleTime.objects.filter(quiz= quiz).first().schedule_datetime
            return Response({
                "status": status.HTTP_200_OK,
                "quiz_id": quiz.id,
                "quiz_schedule_time": schedule_time
            })
        
        return Response({
            "status": status.HTTP_400_BAD_REQUEST
        })

@api_view(['GET', 'PUT', 'DELETE'])
def edit(req, id):
    return Response("Edit")