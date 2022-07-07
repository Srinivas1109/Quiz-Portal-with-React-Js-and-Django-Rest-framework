from django.db import models
from django.contrib.auth.models import User # it is provided by default in django 

class Quiz(models.Model):
    title = models.TextField() # Title of the exam/quiz
    createdOn = models.DateTimeField(auto_now_add= True) # Date the quiz was created on
    lastModifiedOn = models.DateTimeField(auto_now= True) # Date the quiz was modified on

    def __str__(self):
        return self.title

class Question(models.Model):
    relatedTo = models.ForeignKey(Quiz, on_delete= models.CASCADE) # To which exam/quiz this question is related
    question = models.TextField() # Actual text of the question
    marks = models.IntegerField(default= 1) # Marks for this question
    isRadio = models.BooleanField(default= True) # If this question is single correct/Multi correct
    isTextBox = models.BooleanField(default= False) # If this question requires descriptive answer
    createdOn = models.DateTimeField(auto_now_add= True) # Date the quiz was created on
    lastModifiedOn = models.DateTimeField(auto_now= True) # Date the quiz was modified on

    def __str__(self):
        return (self.question[0:50] + "...") if len(self.question) > 50 else self.question

class Choice(models.Model):
    relatedTo = models.ForeignKey(Question, on_delete= models.CASCADE) # To which question this option is related
    choice = models.TextField() # Actual text of the option
    createdOn = models.DateTimeField(auto_now_add= True) # Date the quiz was created on
    lastModifiedOn = models.DateTimeField(auto_now= True) # Date the quiz was modified on

    def __str__(self):
        return (self.choice[0:50] + "...") if len(self.choice) > 50 else self.choice

class CorrectChoice(models.Model):
    question = models.ForeignKey(Question, on_delete= models.CASCADE)
    correctChoice = models.ForeignKey(Choice, on_delete= models.CASCADE)

    def __str__(self):
        # option = CorrectChoice.objects.filter(id= self.correctChoice.id).first()
        return self.correctChoice.choice

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.TextField(default= 'None')
    mobileNo = models.TextField(default= 'None')
    image = models.ImageField(default='default.jpg', upload_to='ProfilePics/')

    def __str__(self):
        return f'{self.user.username} profile'