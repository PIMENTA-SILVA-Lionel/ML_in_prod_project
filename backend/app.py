from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import mlflow.pyfunc
import numpy as np

app = Flask(__name__)
CORS(app)  # Autoriser les requêtes cross-origin

# Charger le modèle à partir de MLFlow (ici on charge le dernier modèle versionné)
model_name = "model"
model = mlflow.pyfunc.load_model(f"models:/{model_name}/latest")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Récupérer les données de la requête JSON
        data = request.get_json()

        # Assumer que les données arrivent sous la forme d'un tableau de features
        # Exemple : { "features": [value1, value2, ...] }
        features = np.array(data['features']).reshape(1, -1)  # Assurez-vous que c'est sous la forme attendue par le modèle

        # Effectuer la prédiction
        prediction = model.predict(features)

        # Retourner la prédiction sous forme de JSON
        return jsonify({"prediction": prediction[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
