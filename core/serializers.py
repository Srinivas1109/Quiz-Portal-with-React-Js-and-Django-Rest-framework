from dataclasses import fields
from rest_framework.serializers import ModelSerializer
from .models import Quiz, Question, Choice, Profile, CorrectChoice
from django.contrib.auth.models import User

class QuizSerializer(ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'


class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class ChoiceSerializer(ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'

class CorrectChoiceSerializer(ModelSerializer):
    class Meta:
        model = CorrectChoice
        fields = '__all__'

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name',
                  'last_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'mobileNo', 'address']



