from django.urls import path

from .views import create_task, update_task, delete_task, get_all_tasks

urlpatterns = [
    path('tasks/', get_all_tasks, name='get_all_tasks'),
    path('tasks/create/', create_task, name='create_task'),
    path('tasks/update/<int:pk>/', update_task, name='update_task'),
    path('tasks/delete/<int:pk>/', delete_task, name='delete_task'),
]
