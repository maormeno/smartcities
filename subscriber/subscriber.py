import json
import os
from django.conf import settings
import psycopg2
import psycopg2.extras
import paho.mqtt.client as mqtt
import time
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
hostname = os.getenv("DB_HOST")
database = os.getenv("DB_NAME")
username = os.getenv("DB_USER")
pwd = os.getenv("DB_PASSWORD")
port_id = 5432
conn = None

# Database Connection
def write_on_database(message):
    try:
        with psycopg2.connect(
            host=hostname, dbname=database, user=username, password=pwd, port=port_id
        ) as conn:

            with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:
                cur.execute(
                    "INSERT INTO emergencies(type, lat, lon, location, message, level) VALUES('{}',{},{},'{}','{}',{}) ;".format(
                        message["type"],
                        message["lat"],
                        message["lon"],
                        message["location"],
                        message["message"],
                        message["level"],
                    )
                )

    except Exception as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


# broker, port, user, password = "planetaryevents.iic2173.net",9000,"common", "iic2173"
broker, user, password = (
    os.getenv("BROKER_HOST"),
    os.getenv("BROKER_USER"),
    os.getenv("BROKER_PASSWORD"),
)
print(broker, user, password)


def on_message(client, userdata, message):
    print("Received message: ", str(message.payload.decode("utf-8")))
    parsed_message = json.loads(message.payload.decode("utf-8"))
    write_on_database(parsed_message)


def on_connect(client, userdata, flags, rc):
    client.subscribe("global-emergencies")
    print("Connection with code : ", str(rc))


client = mqtt.Client("client")
client.on_connect = on_connect
client.on_message = on_message
client.username_pw_set(user, password)
client.connect(broker, 9000)

client.loop_forever()
