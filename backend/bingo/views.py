from django.contrib.auth import login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Agent, Transaction, User # Make sure User is imported
from .serializers import TransactionSerializer

class HealthCheckView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, *args, **kwargs):
        return Response({"status": "ok"})

# --- THIS IS THE MODIFIED, INSECURE LOGIN VIEW ---
class LoginView(APIView):
    """
    FOR DEBUGGING ONLY: Logs a user in by username without a password.
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        if not username:
            return Response({'detail': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Find the user by their username
            user = User.objects.get(username=username)
            # Log them in directly without checking a password
            login(request, user)
            
            # Check if this user is linked to an agent
            is_agent_check = hasattr(user, 'agent')
            
            return Response({
                'status': 'success', 
                'username': user.username,
                'is_agent': is_agent_check
            })
        except User.DoesNotExist:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
# --- END OF MODIFIED VIEW ---

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
        return Response({
            'username': request.user.username,
            'is_agent': is_agent_check,
        })

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