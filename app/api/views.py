from time import sleep
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from emergenciesapp.models import message
from emergenciesapp.services import return_data
from django.contrib.auth.models import User
from django.core.paginator import Paginator
import requests


from emergenciesapp.views import registerPage, loginPage
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.core.paginator import Paginator
from .serializers import MyTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework import generics


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(["POST"])
def calculate_complexity_index(request, id):
    body = str(return_data(id))
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Token vnLj4FeE.NHoUZk7vpTwkE7ECOgHyx42QsliIQBPw",
    }
    response = requests.post("http://master:8080/job", data=body, headers=headers)
    response_json = response.json()
    task_id = response_json["task"]
    print(task_id)
    response2 = requests.get("http://master:8080/job?id=" + str(task_id), headers=headers)
    response2 = response2.json()
    print(response2)
    return Response({"task_id": response2['task_id'], "result": response2['result'], "ready": response2['ready']})


@api_view(["GET"])
def show_emergencies(request):
    page_number = int(request.query_params["page_number"])
    messages = list(message.objects.all())
    paginator = Paginator(messages, 25)
    page = paginator.get_page(page_number)
    emergencies = []
    if paginator.num_pages < page_number:
        return Response({"emergencies": []})
    for mes in page:
        serialized_message = {
            "id": mes.id,
            "type": mes.type,
            "lat": mes.lat,
            "lon": mes.lon,
            "location": mes.location,
            "message": mes.message,
            "level": mes.level,
        }
        emergencies.append(serialized_message)
    return Response({"emergencies": emergencies})


@api_view(["GET"])
def refresh_emergency(request, id):

    # Buscar en db la tabla de los jobs
    pass


# USERS


@api_view(["POST"])
def register(request):
    registerPage(request)


@api_view(["POST"])
def login(request):
    loginPage(request)
