// server.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware pour servir les fichiers statiques du frontend
app.use(express.static('frontend'));

app.get('/', (req, res) => {
  res.send('Backend fonctionne !');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur backend lancé sur http://localhost:${port}`);
});