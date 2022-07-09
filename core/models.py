from django.db import models
# it is provided by default in django
from django.contrib.auth.models import User


class Quiz(models.Model):
    title = models.TextField()  # Title of the exam/quiz
    # Whether the test is scheduled or not
    scheduled = models.BooleanField(default=False)
    # Date the quiz was created on
    createdOn = models.DateTimeField(auto_now_add=True)
    lastModifiedOn = models.DateTimeField(
        auto_now=True)  # Date the quiz was modified on

    def __str__(self):
        return self.title

# Stores the information of all the quizzes which are scheduled
class ScheduleTime(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    schedule_datetime = models.DateTimeField()

    def __str__(self):
        return f'{self.quiz.title} scheduled on {self.schedule_datetime.strftime("%d %B %Y, %I:%M %p")}'


class Question(models.Model):
    # To which exam/quiz this question is related
    relatedTo = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question = models.TextField()  # Actual text of the question
    marks = models.IntegerField(default=1)  # Marks for this question
    # If this question is single correct/Multi correct True--> radio, False--> MultiCorrect
    isRadio = models.BooleanField(default=True)
    # If this question requires descriptive answer
    isTextBox = models.BooleanField(default=False)
    # Date the quiz was created on
    createdOn = models.DateTimeField(auto_now_add=True)
    lastModifiedOn = models.DateTimeField(
        auto_now=True)  # Date the quiz was modified on

    def __str__(self):
        return (self.question[0:50] + "...") if len(self.question) > 50 else self.question


class Choice(models.Model):
    # To which question this option is related
    relatedTo = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice = models.TextField()  # Actual text of the option
    # Date the quiz was created on
    createdOn = models.DateTimeField(auto_now_add=True)
    lastModifiedOn = models.DateTimeField(
        auto_now=True)  # Date the quiz was modified on

    def __str__(self):
        return (self.choice[0:50] + "...") if len(self.choice) > 50 else self.choice

# Correct answer to the given question
class CorrectChoice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    correctChoice = models.ForeignKey(Choice, on_delete=models.CASCADE)

    def __str__(self):
        return self.correctChoice.choice

# user details other than basic
class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE)  # relates the user
    address = models.TextField(default='None')
    mobileNo = models.TextField(default='None')
    image = models.ImageField(default='default.jpg', upload_to='ProfilePics/')

    def __str__(self):
        return f'{self.user.username} profile'

# Stores the time taken by the user for each question
# class Timer(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)
#     hour = models.IntegerField(default=0)
#     minute = models.IntegerField(default=0)
#     second = models.IntegerField(default=0)

#     def __str__(self):
#         return f'{self.hour} Hr: {self.minute} MM: {self.second} SS'

# Relates the user and test
# class Test(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)
#     option = models.ForeignKey(Choice, on_delete=models.CASCADE)

#     def __str__(self):
#         return f'{self.option}'

# class Textarea(models.Model):
#     user = models.ForeignKey(User, on_delete= models.CASCADE)
#     quiz = models.ForeignKey(Quiz, on_delete= models.CASCADE)
#     question = models.ForeignKey(Question, on_delete= models.CASCADE)
#     choice = models.TextField(blank= True, null= True)

#     def __str__(self):
#         return (self.choice[0:50] + "...") if len(self.choice) > 50 else self.choice
