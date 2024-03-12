import datetime
import json
import jwt
import random

def generate_reading(timestamp, weight, test_id):
    hour = timestamp.hour
    temperature_variation = random.uniform(-1, 1) * test_id
    humidity_variation = random.uniform(-2, 2) * test_id
    if 0 <= hour < 6:
        temperature = 10 + random.uniform(-2, 2) + temperature_variation
        humidity = 23 + 2 * hour + humidity_variation
    elif 6 <= hour < 12:
        temperature = 15 + random.uniform(-2, 2) + temperature_variation
        humidity = 35 - 2 * (hour - 6) + humidity_variation
    elif 12 <= hour < 18:
        temperature = 20 + random.uniform(-2, 2) + temperature_variation
        humidity = 23 + 2 * (hour - 12) + humidity_variation
    else:
        temperature = 15 + random.uniform(-2, 2) + temperature_variation
        humidity = 35 - 2 * (hour - 18) + humidity_variation

    data = {
        "type": "data",
        "payload": jwt.encode({"temperature": temperature, "humidity": humidity, "weight": weight}, "secret_key_" + str(test_id), algorithm="HS256"),
        "received": str(timestamp.timestamp())
    }
    return data

current_date = datetime.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

test_objects = {}
num_objects = 10
for j in range(1, num_objects + 1):
    test_key = "TEST" + str(j)
    test_objects[test_key] = {}
    for i in range(24):
        timestamp = current_date + datetime.timedelta(hours=i)
        weight = round(random.uniform(0, 2), 2)
        data = generate_reading(timestamp, weight, j)
        test_objects[test_key][str(i)] = data

with open(f'SensorTestdata3.js', "w") as outfile:
    outfile.write("var testdata = ")
    json.dump(test_objects, outfile, indent=2)
    outfile.write("\nexport default testdata;")
