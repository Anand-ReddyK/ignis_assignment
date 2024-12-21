from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Job
from .serializers import JobSerializer

class JobCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = JobSerializer(data=request.data, many=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Return the saved data with status 201
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class JobListView(APIView):
    def get(self, request, *args, **kwargs):
        jobs = Job.objects.all()

        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)