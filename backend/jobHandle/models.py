from django.db import models

class Job(models.Model):
    job_title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    pay = models.CharField(max_length=100)
    posted_time = models.CharField(max_length=255)
    job_description = models.TextField()
    job_link = models.URLField()
    employment_details = models.JSONField(blank=True, null=True)
    skills = models.JSONField(blank=True, null=True)
    required_skills = models.JSONField(blank=True, null=True)
    preferred_skills = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.job_title
