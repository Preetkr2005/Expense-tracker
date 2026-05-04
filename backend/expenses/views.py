from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser

from django.db.models import Sum
from django.db.models.functions import TruncMonth
from django.http import HttpResponse

import csv
import pandas as pd

from .models import Expense
from .serializers import ExpenseSerializer
from accounts.permissions import IsAdmin


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    #  FILTER + ROLE BASED
    def get_queryset(self):
        queryset = Expense.objects.all()

        # role-based
        if self.request.user.role != 'admin':
            queryset = queryset.filter(user=self.request.user)

        # filters
        category = self.request.query_params.get('category')
        date = self.request.query_params.get('date')

        if category:
            queryset = queryset.filter(category__iexact=category)

        if date:
            queryset = queryset.filter(date=date)

        return queryset

    #  CREATE
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    #  TOTAL
    @action(detail=False, methods=['get'])
    def total(self, request):
        total = self.get_queryset().aggregate(total=Sum('amount'))
        return Response({"total": total['total'] or 0})

    #  MONTHLY CHART
    @action(detail=False, methods=['get'])
    def monthly_chart(self, request):
        data = (
            self.get_queryset()
            .annotate(month=TruncMonth('date'))
            .values('month')
            .annotate(total=Sum('amount'))
            .order_by('month')
        )
        return Response(data)

    #  CATEGORY CHART
    @action(detail=False, methods=['get'])
    def category_chart(self, request):
        data = (
            self.get_queryset()
            .values('category')
            .annotate(total=Sum('amount'))
            .order_by('-total')
        )
        return Response(data)

    #  EXPORT CSV
    @action(detail=False, methods=['get'])
    def export_csv(self, request):
        queryset = self.get_queryset()

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="expenses.csv"'

        writer = csv.writer(response)
        writer.writerow(['Title', 'Amount', 'Category', 'Date'])

        for expense in queryset:
            writer.writerow([
                expense.title,
                expense.amount,
                expense.category,
                expense.date
            ])

        return response

    # CSV UPLOAD
    @action(detail=False, methods=['post'], parser_classes=[MultiPartParser])
    def upload_csv(self, request):
        file = request.FILES.get('file')

        if not file:
            return Response({"error": "No file uploaded"}, status=400)

        try:
            df = pd.read_csv(file)

            expenses = []
            for _, row in df.iterrows():
                expenses.append(
                    Expense(
                        user=request.user,
                        title=row.get('title'),
                        amount=row.get('amount'),
                        category=row.get('category')
                    )
                )

            Expense.objects.bulk_create(expenses)

            return Response({"message": "CSV uploaded successfully"})

        except Exception as e:
            return Response({"error": str(e)}, status=400)

    #  USER A DELETE OWN DATA
def destroy(self, request, *args, **kwargs):
    return super().destroy(request, *args, **kwargs)