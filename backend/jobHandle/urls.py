from django.urls import path
from .views import JobCreateView, JobListView

urlpatterns = [
    path('job-create/', JobCreateView.as_view(), name='job-create'),
    path('jobs/', JobListView.as_view(), name='job-list'),
]
