from django.urls import path
from .views import JobCreateView, JobListView, JobDetailView

urlpatterns = [
    path('job-create/', JobCreateView.as_view(), name='job-create'),
    path('jobs/', JobListView.as_view(), name='job-list'),
    path('job-detail/<int:id>/', JobDetailView.as_view(), name='job-detail'),
]
