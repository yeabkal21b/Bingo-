from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_agent = models.BooleanField(default=False)

class Agent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    operational_credit = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def __str__(self):
        return self.user.username

class Transaction(models.Model):
    ADMIN_CREDIT = 'ADMIN_CREDIT'
    GAME_LAUNCH_COST = 'GAME_LAUNCH_COST'
    TYPE_CHOICES = [
        (ADMIN_CREDIT, 'Admin Credit'),
        (GAME_LAUNCH_COST, 'Game Launch Cost'),
    ]
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='transactions')
    timestamp = models.DateTimeField(auto_now_add=True)
    transaction_type = models.CharField(max_length=32, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    balance_after_transaction = models.DecimalField(max_digits=12, decimal_places=2)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-timestamp']

class GameSpeed(models.Model):
    name = models.CharField(max_length=32)
    seconds_per_call = models.PositiveIntegerField()
    def __str__(self):
        return self.name

class WinningPattern(models.Model):
    name = models.CharField(max_length=64)
    description = models.TextField()
    def __str__(self):
        return self.name

class GameRound(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    board_set = models.JSONField()
    active_board_ids = models.JSONField()
    # Add more fields as needed