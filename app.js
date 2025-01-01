const mysql = require('mysql2');

// Configuration de la connexion
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'population_villes',
    port: 3308, // Port correct
});

// Connexion à MySQL
connection.connect(err => {
    if (err) {
        console.error('Erreur de connexion :', err);
        return;
    }
    console.log('Connexion réussie à MySQL !');
});

// 1. Création de la base de données `evolutions_populations`
connection.query('CREATE DATABASE IF NOT EXISTS population_villes', (err, result) => {
    if (err) {
        console.error('Erreur lors de la création de la base de données :', err);
        return;
    }
    console.log('Base de données vérifiée ou créée avec succès :', result);
});

// 2. Création de la table `evolutions_populations`
const createTableQuery = `
CREATE TABLE IF NOT EXISTS evolutions_populations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_ville INT NOT NULL,
    annee INT NOT NULL,
    population INT NOT NULL,
    remarque VARCHAR(255),
    FOREIGN KEY (id_ville) REFERENCES villes(id)
);`;

connection.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Erreur lors de la création de la table :', err);
        return;
    }
    console.log('Table evolutions_populations créée ou vérifiée avec succès :', result);
});

// 3. Insertion de données dans la table `evolutions_populations`
const insertQuery = `
INSERT INTO evolutions_populations (id_ville, annee, population, remarque) 
VALUES (?, ?, ?, ?);`;
const insertValues = [1, 2024, 105000, 'Croissance soutenue'];

connection.query(insertQuery, insertValues, (err, result) => {
    if (err) {
        console.error('Erreur lors de l\'insertion :', err);
        return;
    }
    console.log('Données insérées avec succès :', result);
});

// 4. Lecture des données dans la table `evolutions_populations`
connection.query('SELECT * FROM evolutions_populations', (err, results) => {
    if (err) {
        console.error('Erreur lors de la récupération des données :', err);
        return;
    }
    console.log('Données récupérées :');
    console.table(results);
});

// 5. Mise à jour des données dans la table `evolutions_populations`
const updateQuery = `
UPDATE evolutions_populations 
SET population = ?, remarque = ? 
WHERE id_ville = ? AND annee = ?;`;
const updateValues = [110000, 'Croissance modérée', 1, 2024];

connection.query(updateQuery, updateValues, (err, result) => {
    if (err) {
        console.error('Erreur lors de la mise à jour :', err);
        return;
    }
    console.log('Données mises à jour avec succès :', result);
});

// 6. Suppression des données dans la table `evolutions_populations`
const deleteQuery = `
DELETE FROM evolutions_populations 
WHERE id_ville = ? AND annee = ?;`;
const deleteValues = [1, 2024];

connection.query(deleteQuery, deleteValues, (err, result) => {
    if (err) {
        console.error('Erreur lors de la suppression des données :', err);
        return;
    }
    console.log('Données supprimées avec succès :', result);
});

// 7. Suppression de la table `evolutions_populations`
const dropTableQuery = 'DROP TABLE IF EXISTS evolutions_populations';

connection.query(dropTableQuery, (err, result) => {
    if (err) {
        console.error('Erreur lors de la suppression de la table :', err);
        return;
    }
    console.log('Table supprimée avec succès :', result);
});

// Fermeture de la connexion
connection.end(err => {
    if (err) {
        console.error('Erreur lors de la fermeture de la connexion :', err);
        return;
    }
    console.log('Connexion fermée avec succès.');
});
