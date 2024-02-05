
from celery import shared_task
from master.services import calculate_complexity

@shared_task
def calculate_complexity_index(response):
    return calculate_complexity(response)
     
