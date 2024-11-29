from flask import Flask, request, jsonify
import pickle
import pandas as pd 


app = Flask(__name__)

# Load the model
with open('agri_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Dummy dataset loading (you will use your actual dataset)
data = pd.read_csv('your_dataset.csv')  # Adjust the path

@app.route('/analyze', methods=['POST'])
def analyze():
    user_input = request.json  # Expecting JSON input
    state = user_input.get('state')
    city = user_input.get('city')

    # Fetch matching data from the dataset based on state and city
    row = data[(data['state'] == state) & (data['city'] == city)]
    
    if row.empty:
        return jsonify({'error': 'No data found for the given state and city'})

    # Here, pass the necessary parameters to the model
    # For example, using soil, temperature, humidity, etc.
    features = [row['soil_type'], row['temperature'], row['humidity']]  # Update based on model features
    prediction = model.predict([features])  # Adjust based on model input structure

    # Format the response
    response = {
        'state': state,
        'city': city,
        'predicted_crops': prediction[:4]  # Top 4 crops
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
