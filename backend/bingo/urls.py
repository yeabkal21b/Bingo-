from django.urls import path
from .views import (
    HealthCheckView, 
    LogoutView, 
    TransactionListView, 
    AutoLoginDebugView # This is the new view we are using
)

urlpatterns = [
    # The new automatic login endpoint
    path('api/auto-login-debug/', AutoLoginDebugView.as_view(), name='auto-login-debug'),
    
    # Other necessary endpoints
    path('api/health/', HealthCheckView.as_view(), name='health-check'),
    path('api/logout/', LogoutView.as_view(), name='api-logout'),
    path('api/transactions/', TransactionListView.as_view(), name='transaction-list'),
]