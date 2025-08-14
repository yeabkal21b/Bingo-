from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            'timestamp', 'transaction_type', 'amount', 'balance_after_transaction', 'notes'
        ]