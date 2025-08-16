from django.contrib.auth import login, logout
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Agent, Transaction, User

class AutoLoginDebugView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        username_to_login = "testuser"
        try:
            user = User.objects.get(username=username_to_login)
            login(request, user)
            is_agent_check = hasattr(user, 'agent')
            return Response({
                'status': 'success', 
                'username': user.username,
                'is_agent': is_agent_check
            })
        except User.DoesNotExist:
            return Response({'detail': f"Debug user '{username_to_login}' not found."}, status=500)

class HealthCheckView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, *args, **kwargs): return Response({"status": "ok"})

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({'status': 'success'})

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