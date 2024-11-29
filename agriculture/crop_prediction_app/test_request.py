import requests

# Define the URL for the Flask API
url = "http://127.0.0.1:5000/analyze"

# Define the JSON payload
data = {
    "state": "Maharashtra",
    "city": "Nashik"
}


# Send the POST request
response = requests.post(url, json=data)

# Check for response status and print the response
if response.status_code == 200:
    print("Response from the API:", response.json())
else:
    print("Error:", response.status_code, response.json())
 
 
# cd  agriculture/crop_prediction_app
#  python test_request.py
