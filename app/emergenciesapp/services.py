import json
from emergenciesapp.models import message
import geopy.distance


def get_latest_emergencies():
    return list(message.objects.all().order_by("-id")[::-1][:2000])


import math


def calculate_distance(origin, destination):

    lon1, lat1 = origin
    lon2, lat2 = destination
    radius = 6371  # km

    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2) * math.sin(dlat / 2) + math.cos(
        math.radians(lat1)
    ) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) * math.sin(dlon / 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    d = radius * c

    return d


def return_data(emergency_id):
    selected_emergency = message.objects.get(pk=emergency_id)
    print("SELECTED EMERGENCY: ", selected_emergency.location, selected_emergency.lat, selected_emergency.lon)
    emergencies = get_latest_emergencies()
    closer_emergencies = []
    for emergency in emergencies:
        # print(emergency, emergency.location, emergency.lat, emergency.lon)
        d_i = calculate_distance(
            (float(emergency.lat), float(emergency.lon)),
            (float(selected_emergency.lat), float(selected_emergency.lon)),
        )
        if d_i < 3:
            closer_emergencies.append(
                {"id": str(emergency.pk), "d_i": str(d_i), "l_i": str(emergency.level)}
            )

    formated_closer_emergencies = json.dumps({"data": "{}".format(closer_emergencies)})
    # print(formated_closer_emergencies)
    return json.dumps({"data": "{}".format(closer_emergencies)})
