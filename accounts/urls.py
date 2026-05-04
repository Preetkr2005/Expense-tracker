from django.urls import path
from .views import verify_email

urlpatterns = [
    path('verify/<int:user_id>/', verify_email),
]