from flask import Flask, request, jsonify
from flask_cors import CORS
import mlflow.pyfunc
import numpy as np
from mlflow.tracking import MlflowClient

app = Flask(__name__)
CORS(app)

# Charger le modèle à partir de MLFlow
model_name = "model"

# Utiliser MlflowClient pour obtenir la dernière version du modèle
client = MlflowClient()
# Rechercher toutes les versions du modèle
model_versions = client.search_model_versions(f"name='{model_name}'")

# Trouver la version la plus récente
latest_version = max(model_versions, key=lambda x: int(x.version)).version

# Charger la dernière version spécifiée
model = mlflow.pyfunc.load_model(f"models:/{model_name}/{latest_version}")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Récupérer les données de la requête JSON
        data = request.get_json()
        print("Données reçues :", data)

        # Assumer que les données arrivent sous la forme d'un tableau de features
        features = np.array(data['features']).reshape(1, -1)

        # Effectuer la prédiction
        prediction = model.predict(features)

        # Retourner la prédiction sous forme de JSON
        return jsonify({"prediction": prediction[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
