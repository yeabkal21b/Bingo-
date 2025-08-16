from django.contrib.auth import login, logout
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Agent, Transaction, User

# --- THIS IS THE NEW, AUTOMATIC LOGIN VIEW ---
class AutoLoginDebugView(APIView):
    """
    FOR DEBUGGING ONLY: Automatically logs in a hardcoded user.
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # We will hardcode the user to log in as.
        # Make sure this user exists in your database and is an agent.
        username_to_login = "testuser" 
        
        try:
            user = User.objects.get(username=username_to_login)
            login(request, user)
            
            is_agent_check = hasattr(user, 'agent')
            
          