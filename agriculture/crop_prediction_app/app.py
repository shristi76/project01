from flask import Flask, request, render_template 
import numpy as np
import pandas as pd
import pickle

# ColumnSelector class to handle DataFrame and NumPy array column selections
class ColumnSelector:
    def __init__(self, columns):
        self.columns = columns  # A list of column names or indices

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        if isinstance(X, pd.DataFrame):
            # If it's a DataFrame, select columns by name
            return X[self.columns]
        elif isinstance(X, np.ndarray):
            # If it's a NumPy array, ensure the columns are integer indices
            if isinstance(self.columns[0], str):
                raise ValueError("Column names are provided but expected indices for NumPy arrays.")
            if all(isinstance(col, int) for col in self.columns):
                return X[:, self.columns]
            else:
                raise ValueError("Column indices must be integers for NumPy arrays.")
        else:
            raise TypeError("Input data must be a pandas DataFrame or a NumPy array.")
        
        
        
       
        
        


# Load the model and scaler (if any) from the pickle file
with open('agriculture/crop_prediction_app/templates/agri_model.pkl', 'rb') as file:
    model_content = pickle.load(file)

# If the model is stored as a tuple, extract the first element as the model
if isinstance(model_content, tuple):
    model = model_content[0]  # Assume first item is the model
else:
    model = model_content  # If not tuple, it's already the model

# Load the CSV file containing the data and normalize the column names
data = pd.read_csv('agriculture/crop_prediction_app/sih_project.csv')
data.columns = data.columns.str.strip().str.lower()  # Normalize column names

# Create Flask app
app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route("/predict", methods=['POST'])
def predict():
    # Get the inputs from the form and normalize the input values (strip and lowercase)
    state = request.form['state'].strip().lower()
    
    city = request.form['city'].strip().lower()
    soil  = request.form['soil_type'].strip().lower()

    # Debugging: Print the inputs to ensure correctness
    print(f"Inputs - State: {state}, City: {city}, Soil_type: {soil}")

    # Fetch the relevant row(s) from the dataset based on the user's inputs
    parameters = data[(data['state'] == state) & (data['city'] == city) & (data['soil type'] == soil)]

    # Debugging: Check if the filter worked as expected
    if parameters.empty:
        print("No data found for the given inputs.")
    else:
        print(f"Matching parameters: {parameters}")

    # If no matching data is found, display a message
    if parameters.empty:
        result = f"No data found for the given state, city, and soil type."
        return render_template('index.html', result=result)

    # Extract the relevant features for prediction
    try:
        N = parameters.iloc[0]['nitrogen_soil']
        P = parameters.iloc[0]['phosphorus_soil']
        K = parameters.iloc[0]['potassium_soil']
        temp = parameters.iloc[0]['temperature']
        humidity = parameters.iloc[0]['humidity']
        ph = parameters.iloc[0]['ph']
        rainfall = parameters.iloc[0]['rainfall']
    except KeyError as e:
        result = f"Error: Missing expected column in dataset - {e}"
        return render_template('index.html', result=result)

    # Create a DataFrame from the feature list to pass it to the model
    feature_dict = {
        'nitrogen_soil': [N],
        'phosphorus_soil': [P],
        'potassium_soil': [K],
        'temperature': [temp],
        'humidity': [humidity],
        'ph': [ph],
        'rainfall': [rainfall]
    }

    # Convert the feature dictionary to a DataFrame
    feature_df = pd.DataFrame(feature_dict)

    # Debugging: Print the DataFrame to check its contents
    print(f"Feature DataFrame for prediction: {feature_df}")

    try:
        # Attempt to predict using the model
        prediction = model.predict(feature_df)

        # Debugging: Check the prediction result and its shape
        print(f"Prediction result: {prediction}")
        if hasattr(prediction, 'shape'):
            print(f"Prediction shape: {prediction.shape}")

        # Extract the predicted value, ensuring it's accessible via index
        if isinstance(prediction, np.ndarray) and len(prediction) > 0:
            predicted_value = prediction[0]
        else:
            predicted_value = prediction  # Use as is if indexing doesn't work

    except Exception as e:
        # Capture any errors during prediction
        result = f"Error during prediction: {e}"
        return render_template('index.html', result=result)

    # Map the predicted value to a crop name using a dictionary
    crop_dict = {
        1: "Rice", 2: "Maize", 3: "Cardamom", 4: "Cotton", 5: "Potatoes", 
        6: "Sugarcane", 7: "Tea", 8: "Mustard Oil", 9: "Oilseeds", 10: "Pineapples", 
        11: "Paddy", 12: "Millet", 13: "Groundnut", 14: "Pomegranate", 
        15: "Sesame", 16: "Wheat", 17: "Apple", 18: "Rubber", 
        19: "Grapes", 20: "Fruits", 21: "Black gram", 22: "Millets"
    }

    # Prepare the output result
    best_crops = []
    if predicted_value in crop_dict:
        best_crops.append(crop_dict[predicted_value])

    # Add additional crops (if possible)
    for i in range(1, 4):
        if predicted_value + i in crop_dict:
            best_crops.append(crop_dict[predicted_value + i])

    result = f"The parameters for {state}, {city} (Soil: {soil}) are:<br>" + \
             f"Nitrogen: {N}<br>Phosphorus: {P}<br>Potassium: {K}<br>" + \
             f"Temperature: {temp}<br>Humidity: {humidity}<br>pH: {ph}<br>" + \
             f"Rainfall: {rainfall}<br>" + \
             f"The best crops to cultivate are: {', '.join(best_crops)}."

    # Render the result on the index.html page
    return render_template('index.html', result=result)

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)


