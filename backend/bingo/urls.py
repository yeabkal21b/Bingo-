from django.urls import path
from .views import (
    HealthCheckView,
    TransactionListView,
    LoginView,
    LogoutView,
    UserView
)

urlpatterns = [
    # Utility/Health Check endpoint
    path('api/health/', HealthCheckView.as_view(), name='health-check'),
    
    # Authentication endpoints
    path('api/login/', LoginView.as_view(), name='api-login'),
    path('api/logout/', LogoutView.as_view(), name='api-logout'),
    path('api/user/', UserView.as_view(), name='api-user'),
    
    # Main application endpoints
    path('api/transactions/', TransactionListView.as_view(), name='transaction-list'),
]