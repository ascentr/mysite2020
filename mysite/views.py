from django.urls import reverse, reverse_lazy
from django.http import HttpResponseRedirect
from django.views.generic import TemplateView


class Index(TemplateView):
    template_name = 'index.html'

class About(TemplateView):
    template_name = 'about.html'

class Portfolio(TemplateView):
    template_name = 'portfolio.html'

class Services(TemplateView):
    template_name = 'services.html'


class TestPage(TemplateView):
    template_name = 'test.html'

#class ThanksPage(TemplateView):
 #   template_name = 'thanks.html'

class TestTodo(TemplateView):
    template_name = 'todo.html'


