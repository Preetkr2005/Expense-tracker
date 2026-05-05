from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta
from django.contrib.auth.hashers import check_password
import random

User = get_user_model()


# ================= SIGNUP =================
@api_view(['POST'])
def signup(request):
    username = request.data.get("username")
    email = request.data.get("email", "").strip()
    password = request.data.get("password", "").strip()

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists"}, status=400)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response({"message": "User created successfully"}, status=201)


# ================= OTP GENERATOR =================
def generate_otp():
    return str(random.randint(100000, 999999))


# ================= LOGIN STEP 1 (SEND OTP) =================
@api_view(['POST'])
def login_step1(request):
    identifier = request.data.get("username") or request.data.get("email")
    password = request.data.get("password", "").strip()

    if not identifier:
        return Response({"error": "Username or Email required"}, status=400)

    # Find user by username OR email
    user = User.objects.filter(username=identifier).first() or \
           User.objects.filter(email=identifier).first()

    if not user or not check_password(password, user.password):
        return Response({"error": "Invalid credentials"}, status=400)

    # Generate OTP
    otp = generate_otp()
    user.otp = otp
    user.otp_created_at = timezone.now()
    user.save()

    # Send OTP
    send_mail(
        "Your OTP Code",
        f"Your OTP is {otp}",
        "jamwalshreya2005@gmail.com",
        [user.email],
        fail_silently=False,
    )

    return Response({"message": "OTP sent to your email"})

# ================= LOGIN STEP 2 (VERIFY OTP + JWT) =================
@api_view(['POST'])
def verify_otp(request):
    identifier = request.data.get("username") or request.data.get("email")
    otp = request.data.get("otp", "").strip()

    user = User.objects.filter(username=identifier).first() or \
           User.objects.filter(email=identifier).first()

    if not user:
        return Response({"error": "User not found"}, status=404)

    if user.otp != otp:
        return Response({"error": "Invalid OTP"}, status=400)

    if timezone.now() - user.otp_created_at > timedelta(minutes=5):
        return Response({"error": "OTP expired"}, status=400)

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "username": user.username
    })


# ================= OPTIONAL EMAIL VERIFY =================
@api_view(['GET'])
def verify_email(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user.is_verified = True
        user.save()
        return Response({"message": "Email verified"})
    except:
        return Response({"error": "Invalid link"})