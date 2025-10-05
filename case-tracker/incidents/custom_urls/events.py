from django.urls import re_path

from incidents import views

app_name = "events"

urlpatterns = [
    re_path(r"^new/$", views.new_event, name="new"),
    re_path(r"^$", views.incident_display, name="index"),
    re_path(r"^(?P<incident_id>\d+)/$", views.details, name="details"),
]
