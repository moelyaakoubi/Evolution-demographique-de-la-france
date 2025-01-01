const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const morgan = require('morgan'); // Importer morgan pour la journalisation des requêtes


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

// Utilisation de morgan pour loguer les requêtes HTTP
app.use(morgan('dev')); // 'dev' est un format prédéfini qui affiche les informations de la requête


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

// Route pour récupérer la population future avec un taux de croissance
app.get('/api/population-future/:ville/:years', (req, res) => {
    const ville = req.params.ville;
    const years = parseInt(req.params.years);

    const query = `
        SELECT v.croissance, e.population
        FROM villes v
        JOIN evolutions_populations e
        ON v.id = e.id_ville
        WHERE v.nom = ?
        ORDER BY e.annee DESC
        LIMIT 1;  -- Récupérer la dernière donnée de population
    `;
    
    db.query(query, [ville], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données :', err);
            res.status(500).send('Erreur serveur');
            return;
        }

        if (results.length > 0) {
            const currentPopulation = results[0].population;
            const growthRate = results[0].croissance / 100; // Convertir le taux de croissance en décimal
            const futurePopulation = currentPopulation * Math.pow(1 + growthRate, years); // Calcul de la population future
            res.json({
                currentPopulation,
                futurePopulation: Math.round(futurePopulation)
            });
        } else {
            res.status(404).send('Ville non trouvée');
        }
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur API lancé sur http://localhost:${port}`);
});
