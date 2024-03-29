from .models import Question, Quiz, Choice, CorrectChoice, Profile, ScheduleTime, Test, Timer
from django.contrib.auth.models import User
from .serializers import CorrectChoiceSerializer, ProfileSerializer, QuizSerializer, QuestionSerializer, ChoiceSerializer, ScheduleTimeSerializer
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
    quizzes = []
    all_quizzes = Quiz.objects.all()
    for quiz in all_quizzes:
        add_quiz = {}
        quiz_serializer = QuizSerializer(quiz)
        add_quiz['quiz'] = quiz_serializer.data
        quiz_schedule = quiz.scheduletime_set.all()
        quiz_schedule_serializer = None
        if len(quiz_schedule) != 0:
            quiz_schedule_serializer = ScheduleTimeSerializer(quiz_schedule[0])
            add_quiz['schedule'] = quiz_schedule_serializer.data
        quizzes.append(add_quiz)

        add_quiz['no_of_question'] = len(quiz.question_set.all())
        # print(quiz.scheduletime_set.all())
    # serializer = QuizSerializer(all_quizzes, many=True)

    # return Response(serializer.data)
    return Response(quizzes)

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
        # print("data['quiz_scheduled']: ", data['quiz_scheduled'])
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
        # print(data)
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
                        if int(data['correctIndices'][j]) == i:
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
        questions_Serializer = QuestionSerializer(questions, many=True)
        data = {}
        data['quiz'] = quiz_serializer.data
        data['questions'] = questions_Serializer.data
        for question in questions_Serializer.data:

            choices = Choice.objects.filter(relatedTo=question["id"])
            choice_serializer = ChoiceSerializer(choices, many=True)
            data["question"] = question
            relatedQuestion = Question.objects.get(id=question["id"])
            selectedChoice = relatedQuestion.correctchoice_set.all()
            # selectedChoice = CorrectChoice.objects.filter(question= relatedQuestion)
            selected_choice_serializer = CorrectChoiceSerializer(selectedChoice, many= True)
            # print(selected_choice_serializer.data)
            data['question']['selectedChoice'] = selected_choice_serializer.data
            # data['question']['selectedChoice'] = {'selected': selectedChoice.first().correctChoice.id, 'id': selectedChoice.first().id}
            data['question']['choices'] = choice_serializer.data

        return Response(data)

    elif req.method == 'PUT':
        data = JSONParser().parse(req)
        quiz_id = data['quizId']
        question_id = data['questionId']
        edited_select_choice = data['selectedChoice']
        edited_choices = data['choices']
        edited_marks = data['marks']
        edited_question = data['question']

        question_obj = Question.objects.get(id= question_id)
        question_obj.question = edited_question
        question_obj.marks = edited_marks
        question_obj.save()

        for option in edited_choices:
            choice = Choice.objects.get(id= option['optionId'])
            choice.choice = option['choice']
            choice.save()
        
        # selected_choice = CorrectChoice.objects.get(id= selected_choice_id)
        # selected_choice.correctChoice = Choice.objects.get(id= edited_select_choice)
        # selected_choice.save()
        for selectedChoice in edited_select_choice:
            if selectedChoice['id']:
                selected_choice = CorrectChoice.objects.get(id= selectedChoice['id'])
                selected_choice.correctChoice = Choice.objects.get(id= selectedChoice['correctChoice'])
                selected_choice.save()
            else:
                selected_choice = CorrectChoice(
                    question= question_obj,
                    correctChoice= Choice.objects.get(id= selectedChoice['correctChoice'])
                    )
                selected_choice.save()
            # print(selectedChoice)

        return Response({"data": data, "status" : status.HTTP_100_CONTINUE})

    elif req.method == 'DELETE':
        data = JSONParser().parse(req)
        
        
        if "questionId" in data:
            # print("QuestionId")
            question_id_delete = data['questionId']
            question_delete = Question.objects.get(id= question_id_delete)
            question_delete.delete()
            return Response({"data": status.HTTP_204_NO_CONTENT, "deleted_id": question_id_delete})
        else:
            # print("Delete Choice Id")
            correct_choice_delete_id = data['delete_Choice_id']
            correct_choice_delete = Choice.objects.get(id=correct_choice_delete_id)
            delete_choice = CorrectChoice.objects.get(correctChoice= correct_choice_delete)
            delete_choice.delete()
            return Response({"data": status.HTTP_204_NO_CONTENT, "deleted_choice_id": correct_choice_delete_id})
    return Response("Question Edit")


@api_view(['POST'])
def userTest(req):
    data = JSONParser().parse(req)
    # print(data)
    quiz_id = data['quiz']
    question_id = data['question']
    user_id = data['user']
    option_id = data['option']

    user_exist = User.objects.filter(id=user_id).exists()
    if user_exist:
        user = User.objects.get(id=user_id)
        quiz_exist = Quiz.objects.filter(id=quiz_id).exists()
        if quiz_exist:
            quiz = Quiz.objects.get(id=quiz_id)
            question = Question.objects.filter(id=question_id).first()
            test = Test.objects.filter(user=user).filter(
                quiz=quiz).filter(question=question).first()
            option = Choice.objects.filter(id=option_id).first()
            if(not test):
                test = Test(user=user, quiz=quiz,
                            question=question, option=option)
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
    user_exist = User.objects.filter(id=user_id).exists()
    if user_exist:
        user = User.objects.get(id=user_id)
        quiz = Quiz.objects.filter(id=quiz_id).first()
        user_test_responses = Test.objects.filter(user=user).filter(quiz=quiz)
        # print(user_test_responses)
        responses = []
        for i in user_test_responses:
            responses.append({'questionId': i.question.id,
                             'optionSelected': i.option.id})
        return Response({'status': status.HTTP_100_CONTINUE, 'data': responses})
    else:
        return Response({'status': status.HTTP_401_UNAUTHORIZED})


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def userQuestionTimer(req):
    data = JSONParser().parse(req)
    user_id = data['user']
    quiz_id = data['quiz']
    user_exist = User.objects.filter(id=user_id).exists()
    if user_exist:
        user = User.objects.get(id=user_id)
        quiz = Quiz.objects.filter(id=quiz_id).first()
        user_timer = Timer.objects.filter(user=user).filter(
            quiz=quiz)  # stores data from database
        # print(user_test_responses)
        timer = []
        existng_ids = []
        for i in user_timer:
            timer.append({'questionId': i.question.id, 'time': {
                         "hour": i.hour, "minute": i.minute, "second": i.second}})
            existng_ids.append(i.question.id)
        not_in_data_base = Question.objects.filter(relatedTo=quiz)
        for (index, item) in enumerate(not_in_data_base):
            if(item.id not in existng_ids):
                timer.append({'questionId': item.id, 'time': {
                             "hour": 0, "minute": 0, "second": 0}})

        return Response({'status': status.HTTP_100_CONTINUE, 'data': timer})
    else:
        return Response({'status': status.HTTP_401_UNAUTHORIZED})


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def userQuestionTimerSave(req):
    data = JSONParser().parse(req)
    user_id = data['user']
    quiz_id = data['quiz']
    question_id = data['question']
    user_time = data['time']
    user_exist = User.objects.filter(id=user_id).exists()
    if user_exist:
        user = User.objects.get(id=user_id)
    #     # print("User: ", user)
        quiz = Quiz.objects.filter(id=quiz_id).first()
    #     # print("Quiz: ", quiz)
        question = Question.objects.filter(id=question_id).first()
    #     # print("Question: ", question)
        user_question_time = Timer.objects.filter(
            user=user).filter(question=question).first()
        print(user_question_time)
        if user_question_time:
            user_question_time.hour = user_time['hour']
            user_question_time.minute = user_time['minute']
            user_question_time.second = user_time['second']
            user_question_time.save()
        else:
            user_question_time = Timer(
                user=user,
                quiz=quiz,
                question=question,
                hour=user_time['hour'],
                minute=user_time['minute'],
                second=user_time['second']
            )
            user_question_time.save()

    #     # 'response': {'user_id':user_id, 'quiz_id':quiz_id, 'question_id':question_id}
    #     return Response({'status': status.HTTP_100_CONTINUE, 'data': responses})
    # else:
    #     return Response({'status': status.HTTP_401_UNAUTHORIZED})
    return Response({"data": data})


@api_view(['POST'])
def quizExist(req):
    data = JSONParser().parse(req)
    quizName = data['quizName']
    quiz = Quiz.objects.filter(title=quizName).first()
    if quiz:
        quiz_serializer = QuizSerializer(quiz)
        return Response({'status': status.HTTP_200_OK, 'data': quiz_serializer.data})
    # else:
        # quiz = Quiz(title)
    return Response({'status': status.HTTP_404_NOT_FOUND})
