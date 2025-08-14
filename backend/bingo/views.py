from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Agent, Transaction
from .serializers import TransactionSerializer

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

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return Response({'status': 'success', 'username': user.username})
        
        return Response(
            {'detail': 'Invalid credentials'}, 
            status=status.HTTP_401_UNAUTHORIZED
        )

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({'status': 'success'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Using hasattr is more robust, as you suggested.
        # It checks for the reverse relationship from the Agent model.
        is_agent_check = hasattr(request.user, 'agent')

        return Response({
            'username': request.user.username,
            'is_agent': is_agent_check,
        })