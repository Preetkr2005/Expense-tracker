from django.shortcuts import render

# Create your views here.
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response

User = get_user_model()

@api_view(['GET'])
def verify_email(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user.is_verified = True
        user.save()
        return Response({"message": "Email verified"})
    except:
        return Response({"error": "Invalid link"})