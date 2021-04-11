from django.urls import path

from apps.views.loginView import LoginView

urlpatterns = [
    path('<int:id>/', LoginView.as_view()),
]
