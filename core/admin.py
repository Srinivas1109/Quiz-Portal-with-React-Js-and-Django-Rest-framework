from django.contrib import admin
from .models import Quiz, Question, Choice, CorrectChoice

# Register your models here.
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Choice)
admin.site.register(CorrectChoice)
