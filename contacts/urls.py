from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('', views.contactsView, name='contacts'),
    path('success/', views.successView, name="success"),
]
