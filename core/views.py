from asyncio.windows_events import NULL
from .models import Question, Quiz, Choice, CorrectChoice, Profile, ScheduleTime, Test, Timer
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
        user_profile = User.objects.filter(username=user).first()
        # print(user_profile)
        profile = Profile.objects.filter(user=user_profile).first()
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
    quiz = Quiz.objects.get(id=id)
    all_questions = Question.objects.filter(
        relatedTo=quiz).order_by("-createdOn")
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
        profileSerializer = ProfileSerializer(data=data)

        if serializer.is_valid() and profileSerializer.is_valid():
            user = User(
                first_name=serializer.data['first_name'],
                last_name=serializer.data['last_name'],
                email=serializer.data['email'],
                username=serializer.data['username'],
            )
            # print(user)
            profile = Profile(
                user=user,
                address=profileSerializer.data['address'],
                mobileNo=profileSerializer.data['mobileNo']
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
        quiz_exist = Quiz.objects.filter(title=data['quiz_name']).exists()
        # print(quiz_exist)
        print("data['quiz_scheduled']: ", data['quiz_scheduled'])
        # print(data['quiz_name'])
        quiz = None
        if(not quiz_exist):
            quiz = Quiz(
                title=data['quiz_name'],
                scheduled=data['quiz_scheduled'],
            )
            # print("Quiz: ", quiz)
            quiz.save()
            if data['quiz_scheduled']:
                date_time = data['quiz_scheduled_time']
                date_time = datetime.datetime(
                    date_time[0], date_time[1], date_time[2], date_time[3], date_time[4])
                schedule = ScheduleTime(
                    quiz=quiz,
                    schedule_datetime=date_time
                )
                schedule.save()
                # print(schedule)

        else:
            quiz = Quiz.objects.filter(title=data['quiz_name']).first()

        question = Question(
            relatedTo=quiz,
            question=data['question'],
            marks=int(data['marks']),
            isRadio=True if data['option_type'] == "singleCorrect" else False,
            isTextBox=True if data['option_type'] == "textBox" else False,
        )
        question.save()
        # print("Question: ", question)
        # print()

        if not question.isTextBox:
            for i in range(0, int(data['number_of_options'])):
                choice = Choice(
                    relatedTo=question,
                    choice=data['options'][i],
                )
                choice.save()
                # print(f'Choice{i+1}: ', choice)
                # print()
                # print(question.isRadio)
                # print(int(data['answer'])-1 == i )
                if question.isRadio and (int(data['answer'])-1 == i):
                    answer = CorrectChoice(
                        question=question,
                        correctChoice=choice
                    )
                    answer.save()
                    # print("Answer", answer)
                    # print()
                else:
                    for j in range(0, int(len(data['correctIndices']))):
                        if int(data['correctIndicies'][j]) == i:
                            answer = CorrectChoice(
                                question=question,
                                correctChoice=choice
                            )
                            answer.save()
                            # print("Answers", answer)
        elif question.isTextBox:
            choice = Choice(
                relatedTo=question,
                choice=data['text_box_answer']
            )
            choice.save()

            answer = CorrectChoice(
                question=question,
                correctChoice=choice
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
        quiz = Quiz.objects.filter(title=quiz_name).exists()
        if quiz:
            quiz = Quiz.objects.filter(title=quiz_name).first()

            schedule_time = ScheduleTime.objects.filter(quiz=quiz).exists()
            if schedule_time:
                schedule_time = ScheduleTime.objects.filter(
                    quiz=quiz).first().schedule_datetime
            return Response({
                "status": status.HTTP_200_OK,
                "quiz_id": quiz.id,
                "quiz_schedule_time": schedule_time
            })

        return Response({
            "status": status.HTTP_400_BAD_REQUEST
        })


@api_view(['GET', 'PUT', 'DELETE'])
def quizEdit(req, id):
    try:
        quiz = Quiz.objects.get(pk=id)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if req.method == 'GET':
        quiz_serializer = QuizSerializer(quiz)
        questions = quiz.question_set.all()
        # print(questions)
        questions_Serializer = QuestionSerializer(questions, many= True)
        data = {}
        data['quiz'] = quiz_serializer.data
        data['questions'] = questions_Serializer.data
        for index , question in enumerate(questions_Serializer.data):
            choices = Choice.objects.filter(relatedTo= question["id"])
            choice_serializer = ChoiceSerializer(choices, many=True)
            data["question"] = question
            data['question']['choices'] = choice_serializer.data

        return Response(data)

    elif req.method == 'PUT':
        serializer = QuizSerializer(quiz, data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif req.method == 'DELETE':
        Quiz.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response("Question Edit")


@api_view(['POST'])
def userTest(req):
    data = JSONParser().parse(req)
    # print(data)
    quiz_id = data['quiz']
    question_id = data['question']
    user_id = data['user']
    option_id = data['option']

    user_exist = User.objects.filter(id= user_id).exists()
    if user_exist:
        user= User.objects.get(id= user_id)
        quiz_exist = Quiz.objects.filter(id= quiz_id).exists()
        if quiz_exist:
            quiz = Quiz.objects.get(id= quiz_id)
            question = Question.objects.filter(id= question_id).first()
            test = Test.objects.filter(user= user).filter(quiz= quiz).filter(question= question).first()
            option= Choice.objects.filter(id= option_id).first()
            if(not test):
                test = Test(user= user, quiz= quiz, question= question, option= option)
                test.save()
                return Response({'status': status.HTTP_200_OK})
                # print(test)
            else:
                test.option = option
                test.save()
                return Response({'status': status.HTTP_200_OK})
                # print(test)
        else:
            return Response({'status': status.HTTP_204_NO_CONTENT})
    else:
        return Response({'status': status.HTTP_401_UNAUTHORIZED})

@api_view(['POST']) 
# @permission_classes([IsAuthenticated])
def userResponses(req):
    data = JSONParser().parse(req)
    user_id = data['user']
    quiz_id = data['quiz']
    user_exist = User.objects.filter(id= user_id).exists()
    if user_exist:
        user= User.objects.get(id= user_id)
        quiz= Quiz.objects.filter(id= quiz_id).first()
        user_test_responses = Test.objects.filter(user= user).filter(quiz= quiz)
        # print(user_test_responses)
        responses = []
        for i in user_test_responses:
            responses.append({'questionId': i.question.id, 'optionSelected': i.option.id})
        return Response({'status': status.HTTP_100_CONTINUE, 'data': responses}) 
    else:
        return Response({'status': status.HTTP_401_UNAUTHORIZED})

@api_view(['POST']) 
# @permission_classes([IsAuthenticated])
def userQuestionTimer(req):
    data = JSONParser().parse(req)
    user_id = data['user']
    quiz_id = data['quiz']
    question_id = data['question']
    user_exist = User.objects.filter(id= user_id).exists()
    if user_exist:
        user= User.objects.get(id= user_id)
        # print("User: ", user)
        quiz= Quiz.objects.filter(id= quiz_id).first()
        # print("Quiz: ", quiz)
        question= Question.objects.filter(id= question_id).first()
        # print("Question: ", question)
        user_question_time = Timer.objects.filter(user= user).filter(question= question).first()
        # print("Timer: ", user_question_time)
        responses = {}
        responses['hour'] = 0
        responses['minute'] = 0
        responses['second'] = 0
        if user_question_time:
            responses['hour'] = user_question_time.hour
            responses['minute'] = user_question_time.minute
            responses['second'] = user_question_time.second

        # 'response': {'user_id':user_id, 'quiz_id':quiz_id, 'question_id':question_id}
        return Response({'status': status.HTTP_100_CONTINUE, 'data': responses}) 
    else:
        return Response({'status': status.HTTP_401_UNAUTHORIZED})

@api_view(['POST']) 
# @permission_classes([IsAuthenticated])
def userQuestionTimerSave(req):
    data = JSONParser().parse(req)
    user_id = data['user']
    quiz_id = data['quiz']
    question_id = data['question']
    # user_exist = User.objects.filter(id= user_id).exists()
    # if user_exist:
    #     user= User.objects.get(id= user_id)
    #     # print("User: ", user)
    #     quiz= Quiz.objects.filter(id= quiz_id).first()
    #     # print("Quiz: ", quiz)
    #     question= Question.objects.filter(id= question_id).first()
    #     # print("Question: ", question)
    #     user_question_time = Timer.objects.filter(user= user).filter(question= question).first()
    #     # print("Timer: ", user_question_time)
    #     responses = {}
    #     responses['hour'] = 0
    #     responses['minute'] = 0
    #     responses['second'] = 0
    #     if user_question_time:
    #         responses['hour'] = user_question_time.hour
    #         responses['minute'] = user_question_time.minute
    #         responses['second'] = user_question_time.second

    #     # 'response': {'user_id':user_id, 'quiz_id':quiz_id, 'question_id':question_id}
    #     return Response({'status': status.HTTP_100_CONTINUE, 'data': responses}) 
    # else:
    #     return Response({'status': status.HTTP_401_UNAUTHORIZED})
    return Response({"data": data})

@api_view(['POST'])
def quizExist(req):
    data = JSONParser().parse(req)
    quizName = data['quizName']
    quiz = Quiz.objects.filter(title= quizName).first()
    if quiz:
        quiz_serializer = QuizSerializer(quiz)
        return Response({'status': status.HTTP_200_OK, 'data': quiz_serializer.data})
    # else:
        # quiz = Quiz(title)
    return Response({'status': status.HTTP_404_NOT_FOUND})