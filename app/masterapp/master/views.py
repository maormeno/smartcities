from time import sleep
from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.contrib.auth.models import User
from django.core.paginator import Paginator
from celery.result import AsyncResult

from master.tasks import calculate_complexity_index

# @permission_classes([IsAuthenticated])
class JobsApiView(APIView):
    def get(self, request, *args, **kwargs):

        try:
            id = request.query_params["id"]
            result = AsyncResult(id)
            print(id)
            print(result.ready())
            print("THE RESULT FROM CELERY IS: ", result.get())
            return Response({"task_id": id, "result": result.get(), "ready": result.ready()})

        except:
            return Response({"Error": "No id provided"})

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        print("received:", request)
        try:
          data = request.data["data"]
          task = calculate_complexity_index.delay(data)
          task.get()
          return Response({"status": "Calculating complexity", "task": task.id})
        except:
            return Response({"error": "An error has ocured, try again"})


class HeartBeatApiView(APIView):
    def get(self, request, *args, **kwargs):
        # Ver si el servicio esta operativo
        return Response({"Status": "True"})
