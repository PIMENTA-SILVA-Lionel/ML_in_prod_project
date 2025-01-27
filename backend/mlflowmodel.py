import mlflow
import mlflow.sklearn
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

def train_and_log_model():
    iris = load_iris()
    X = iris.data  # Features
    y = iris.target  # Target (espèce de l'iris)

    # Diviser les données en ensembles d'entraînement et de test
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Créer un modèle de régression linéaire
    model = LogisticRegression(max_iter=200)

    # Entraîner le modèle
    model.fit(X_train, y_train)

    # Enregistrer le modèle avec MLFlow sous le nom "model"
    with mlflow.start_run():
        # Log du modèle comme un modèle MLflow classique
        mlflow.sklearn.log_model(model, "model")  # Modèle enregistré pour cette run spécifique

        # Optionnel : Log de métriques et paramètres
        mlflow.log_param("model_type", "linear_regression")
        mlflow.log_metric("mean_score", model.score(X_test, y_test))

        # Enregistrer le modèle dans le registre MLFlow avec un nom spécifique (le nom du modèle)
        model_uri = f"runs:/{mlflow.active_run().info.run_id}/model"
        mlflow.register_model(model_uri, "model")

    print("Modèle enregistré avec succès dans le registre MLFlow !")

def load_model():
    # Charger le modèle depuis MLFlow
    model_name = "model"
    model = mlflow.pyfunc.load_model(f"models:/{model_name}/latest")
    return model