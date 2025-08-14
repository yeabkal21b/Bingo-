from django.urls import path
from .views import TransactionListView

urlpatterns = [
    path('api/transactions/', TransactionListView.as_view(), name='transaction-list'),
    # ...other endpoints...
]