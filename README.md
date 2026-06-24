A simple website which predicts flight prices based on 4 factors(airline, class, days left before departure, and
departure time data) using a machine learning model( Random Forest Regression).

# WORKING:
clean_dataset.csv  →  notebook.ipynb →  flight_model.pkl + model_columns.pkl
                                                                    ↓
                                                          app.py (Flask API, port 5000)
                                                                    ↓
                                                          index.html + script.js (browser form)

# STACK:
Backend: Python, Flask, scikit-learn, pandas
Frontend: HTML, CSS, vanilla JavaScript,
Model: RandomForestRegressor (scikit-learn)

# Hoested on Render
