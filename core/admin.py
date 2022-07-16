from django.contrib import admin
from .models import Quiz, Question, Choice, CorrectChoice, Test, Profile, Timer, ScheduleTime

# Register your models here.
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Choice)
admin.site.register(CorrectChoice)
admin.site.register(Test)
admin.site.register(Profile)
admin.site.register(Timer)
admin.site.register(ScheduleTime)
