from flask import Flask, request, jsonify
from flask_cors import CORS
import mlflow.pyfunc
import numpy as np
from mlflow.tracking import MlflowClient

from mlflowmodel import train_and_log_model, load_model

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Charger le modèle à partir de MLFlow
model_name = "iris_model"

# Utiliser MlflowClient pour obtenir la dernière version du modèle
client = MlflowClient()
model_versions = client.search_model_versions(f"name='{model_name}'")

train_and_log_model()
model = load_model()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Récupérer les données de la requête JSON
        data = request.get_json()
        features = np.array(data['features']).reshape(1, -1)

        # Effectuer la prédiction
        prediction = model.predict(features)

        # Convertir la prédiction en espèce d'iris
        species_map = {0: "Setosa", 1: "Versicolor", 2: "Virginica"}
        predicted_species = species_map[int(prediction[0])]

        # Retourner le résultat
        return jsonify({"prediction": predicted_species})
    except Exception as e:
        print("Erreur :", str(e))
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
