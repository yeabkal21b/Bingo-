import os
from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Agent, Transaction, User
from .serializers import TransactionSerializer

# --- VVV THIS IS THE MODIFIED, DEBUGGING LOGIN VIEW VVV ---
class LoginView(APIView):
    """
    FOR DEBUGGING ONLY: Logs all incoming login attempts.
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # --- START OF DEBUG LOGS ---
        print("="*50)
        print("LOGIN ATTEMPT RECEIVED")
        
        username_from_request = request.data.get('username')
        password_from_request = request.data.get('password')
        
        print(f"Username from request: '{username_from_request}'")
        print(f"Password from request: '{password_from_request}'")
        
        try:
            user_in_db = User.objects.get(username=username_from_request)
            print(f"SUCCESS: Found user '{user_in_db.username}' in the database.")
            print(f"User is active: {user_in_db.is_active}")
            
            password_matches = user_in_db.check_password(password_from_request)
            print(f"Password check result: {password_matches}")
            
        except User.DoesNotExist:
            print(f"ERROR: Could not find user '{username_from_request}' in the database.")
            print("="*50)
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        # This is the actual authentication check Django performs
        user = authenticate(request, username=username_from_request, password=password_from_request)
        
        if user is not None:
            print("SUCCESS: Django's authenticate() function succeeded.")
            login(request, user)
            print("="*50)
            return Response({'status': 'success', 'username': user.username})
        else:
            print("ERROR: Django's authenticate() function failed.")
            print("="*50)
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
# --- END OF MODIFIED VIEW ---

# --- Other views remain the same ---
class HealthCheckView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, *args, **kwargs): return Response({"status": "ok"})

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({'status': 'success'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        is_agent_check = hasattr(request.user, 'agent')
        return Response({'username': request.user.username, 'is_agent': is_agent_check})

class TransactionListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            agent = Agent.objects.get(user=request.user)
        except Agent.DoesNotExist:
            return Response({'detail': 'Not an agent'}, status=status.HTTP_403_FORBIDDEN)
        transactions = Transaction.objects.filter(agent=agent).order_by('-timestamp')
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)