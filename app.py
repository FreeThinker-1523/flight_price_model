from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib 

app = Flask(__name__)
CORS(app)

model = joblib.load('flight_model.pkl')
model_columns = joblib.load('model_columns.pkl')

@app.route('/predict', methods=['POST'])

def predict():
    data = request.get_json()

    try:
        synthetic = pd.DataFrame(
            {
                'airline': [data['airline']],
                'class': [data['class']],
                'days-left': [int(data['days_left'])],
                'departure_time': [data['departure_time']]
            } )
        
        synthetic_encoded = pd.get_dummies(
            synthetic, columns=['airline', 'class', 'departure_time']
        )

        synthetic_encoded = synthetic_encoded.reindex(columns=model_columns,fill_value=0)

        prediction = model.predict(synthetic_encoded)[0]
        return jsonify({'price': round(float(prediction), 2)})
    
    except Exception as e:
        return jsonify({'error':str(e)}), 400
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)