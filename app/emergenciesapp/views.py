from pyexpat.errors import messages
from django.shortcuts import render, redirect
from emergenciesapp.models import message
from .forms import CreateUserForm, LoginForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
# Create your views here.
def index(request):
    messages = list(message.objects.all())
    return render(request, 'index.html', {"messages":messages})

def registerPage(request):
    form = CreateUserForm()
    context = {'form':form}
    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            user = form.cleaned_data.get('username')
            messages.success(request, 'Cuenta creada para el usuario ' + user)
            return redirect('/login')
    
    return render(request, 'register.html', context)

def loginPage(request):
    form = LoginForm()
    context = {'form':form}
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/messages')
        else:
            messages.info(request, "El nombre de usuario o contraseña son incorrectos")
            return render(request, 'login.html', context)
    
    return render(request, 'login.html', context)