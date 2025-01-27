import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [features, setFeatures] = useState({ 
    sepalLength: '', 
    sepalWidth: '', 
    petalLength: '', 
    petalWidth: '' 
  }); // Stocker les caractéristiques
  const [prediction, setPrediction] = useState(null); // Stocker la prédiction
  const [error, setError] = useState(null); // Stocker les erreurs

  // Gérer les modifications des champs d'entrée
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeatures((prev) => ({ ...prev, [name]: value }));
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    try {
      // Vérification de l'environnement (local ou Docker)
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000/predict' : 'http://backend:5000/predict';

      // Envoyer les données au backend Flask
      const response = await axios.post(apiUrl, {
        features: [
          parseFloat(features.sepalLength),
          parseFloat(features.sepalWidth),
          parseFloat(features.petalLength),
          parseFloat(features.petalWidth),
        ],
      });
      console.log('Réponse du serveur :', response.data);

      // Stocker la prédiction retournée
      setPrediction(response.data.prediction);
    } catch (err) {
      console.error('Erreur lors de la requête :', err);
      setError('Erreur lors de la prédiction : Veuillez vérifier vos données.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Prédictions Machine Learning</h1>
      <p>Entrez les caractéristiques de la fleur pour prédire son espèce :</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Longueur du sépale :</label>
          <input
            type="number"
            name="sepalLength"
            value={features.sepalLength}
            onChange={handleChange}
            placeholder="Ex: 5.1"
            required
          />
        </div>
        <div>
          <label>Largeur du sépale :</label>
          <input
            type="number"
            name="sepalWidth"
            value={features.sepalWidth}
            onChange={handleChange}
            placeholder="Ex: 3.5"
            required
          />
        </div>
        <div>
          <label>Longueur du pétale :</label>
          <input
            type="number"
            name="petalLength"
            value={features.petalLength}
            onChange={handleChange}
            placeholder="Ex: 1.4"
            required
          />
        </div>
        <div>
          <label>Largeur du pétale :</label>
          <input
            type="number"
            name="petalWidth"
            value={features.petalWidth}
            onChange={handleChange}
            placeholder="Ex: 0.2"
            required
          />
        </div>
        <button type="submit">Prédire</button>
      </form>

      {prediction && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <h2>Résultat de la prédiction :</h2>
          <p>L'espèce prédite est : <strong>{prediction}</strong></p>
          {/* Affichage de l'image */}
          <img
            src={`/images/${prediction}.jpg`}
            alt={`Espèce ${prediction}`}
            style={{ maxWidth: '300px', marginTop: '10px' }}
          />
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <h2>Erreur :</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
