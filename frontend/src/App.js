import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [features, setFeatures] = useState(''); // Pour stocker les données entrées par l'utilisateur
  const [prediction, setPrediction] = useState(null); // Pour stocker la prédiction retournée

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoyer les données au backend Flask
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        features: features.split(',').map(Number), // Convertir les données en tableau de nombres
      });

      // Stocker la prédiction retournée
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
      setPrediction('Erreur lors de la prédiction');
    }
  };

  return (
    <div>
      <h1>Prédictions Machine Learning</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="features">Entrez les caractéristiques :</label>
        <input
          type="text"
          id="features"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          placeholder="Ex : 1.2, 3.4, 5.6"
        />
        <button type="submit">Prédire</button>
      </form>

      {prediction !== null && (
        <div>
          <h2>Résultat de la prédiction :</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default App;
