from django.test import TestCase
from .models import Agent, User

class AgentModelTest(TestCase):
    def test_agent_str(self):
        user = User.objects.create(username='testuser')
        agent = Agent.objects.create(user=user)
        self.assertEqual(str(agent), 'testuser')