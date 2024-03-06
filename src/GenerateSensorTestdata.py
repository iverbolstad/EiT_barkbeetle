import datetime
import json
import jwt
import random

# Function to generate JSON object for a given timestamp and location
def generate_reading(timestamp, weight):
    # Simulate temperature and humidity variation based on time of day
    hour = timestamp.hour
    if 0 <= hour < 6:
        temperature = 10 + random.uniform(-2, 2)  # Temperature range: 8°C to 12°C
        humidity = 23 + 2 * hour
    elif 6 <= hour < 12:
        temperature = 15 + random.uniform(-2, 2)  # Temperature range: 13°C to 17°C
        humidity = 35 - 2 * (hour - 6)
    elif 12 <= hour < 18:
        temperature = 20 + random.uniform(-2, 2)  # Temperature range: 18°C to 22°C
        humidity = 23 + 2 * (hour - 12)
    else:
        temperature = 15 + random.uniform(-2, 2)  # Temperature range: 13°C to 17°C
        humidity = 35 - 2 * (hour - 18)
    
    # Generate JSON object
    data = {
        "type": "data",
        "payload": jwt.encode({"temperature": temperature, "humidity": humidity, "weight": weight}, "secret_key", algorithm="HS256"),
        "received": str(timestamp.timestamp())
    }
    return data

# Get the current date
current_date = datetime.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

# Generate JSON objects for each hour of the current day without specific locations
readings = {}
for i in range(24):
    timestamp = current_date + datetime.timedelta(hours=i)
    weight = round(random.uniform(0, 2), 2)
    data_key = "data" + str(i)
    readings[data_key] = []
    
    data = generate_reading(timestamp, weight)
    readings[data_key].append(data)

# Write JSON objects to file
with open("SensorTestdata.js", "w") as outfile:
    outfile.write("var testdata = ")
    json.dump(readings, outfile, indent=2)