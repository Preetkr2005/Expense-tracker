from django.urls import path
from .views import verify_email, signup

urlpatterns = [
    path('signup/', signup),
    path('verify/<int:user_id>/', verify_email),
]