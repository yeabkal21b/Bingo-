from rest_framework.permissions import IsAuthenticated
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
            return Response({'detail': 'Not an agent'}, status=403)
        transactions = Transaction.objects.filter(agent=agent).order_by('-timestamp')
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)