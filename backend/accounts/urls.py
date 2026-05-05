from django.urls import path
from .views import verify_email, signup, login_step1, verify_otp

urlpatterns = [
    path('signup/', signup),
    path('verify/<int:user_id>/', verify_email),
    path("login/", login_step1),
    path("verify-otp/", verify_otp),    
]