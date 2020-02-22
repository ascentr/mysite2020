from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.http import HttpResponseRedirect
from django.views.generic import TemplateView

from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from braces.views import SelectRelatedMixin
from django.contrib.auth.models import User
from todo.models import Todo
from todo.forms import TodoForm

#countdown views
# Create your views here.
class HomeView(TemplateView):
    template_name = 'cd_index.html'

class LettView(TemplateView):
    template_name = 'lett_index.html'

class NumView(TemplateView):
    template_name = 'num_index.html'

class CndView(TemplateView):
    template_name = 'cnd_index.html'


@login_required
def dailyChallenge(request):
#    user = User.ForeignKey(User,  on_delete=models.CASCADE)
    todo_list = Todo.objects.order_by('lastdate')
    form = TodoForm()
    context = { 'todo_list' : todo_list , 'form': form }
    return render(request, 'cd_daily.html', context)