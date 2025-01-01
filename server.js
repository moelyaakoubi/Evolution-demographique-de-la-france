const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuration de la base de données
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'population_villes',
    port: 3308,
});

// Middleware
app.use(cors());
app.use(express.json());

// Route pour récupérer l'évolution de la population d'une ville
app.get('/api/population/:ville', (req, res) => {
    const ville = req.params.ville;
    const query = `
        SELECT e.annee, e.population 
        FROM evolutions_populations e
        JOIN villes v ON e.id_ville = v.id
        WHERE v.nom = ? 
        ORDER BY e.annee;
    `;
    db.query(query, [ville], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.json(results);
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur API lancé sur http://localhost:${port}`);
});
