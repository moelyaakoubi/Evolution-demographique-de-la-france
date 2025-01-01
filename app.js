const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'population_villes',
    port: 3308 // Updated port


});
// 2.connexion javascript à la base de données
/* connection.connect(err => {
    if (err) {
        console.error('Erreur de connexion :', err);
    return;
    }
console.log('Connexion réussie à MySQL !');});
// Fermez la connexion une fois terminé
connection.end();
*/


// 3. Insertion de Données dans la Table evolutions_populations
/* const sql = 'INSERT INTO evolutions_populations (id_ville,annee, population, remarque) VALUES (?,?,?,?)';

const values = [1,2024, 105000, 'Croissance soutenue'];

connection.query(sql, values, (err, result) => {
    if (err) {
        console.error('Erreur lors de l\'insertion :', err);
        return;
    }
 console.log('Données insérées avec succès :', result);}) */

// 4. lecture de données dans la table evolutions_populations
/* connection.connect(err => {
    if (err) {
        console.error('Erreur de connexion :', err);
    return;
    }
    connection.query('SELECT * FROM evolutions_populations', (err, results) => {
    if (err) {
        console.error('Erreur lors de la récupération des données :', err);
    return;
    }
    console.table(results);
    });
    connection.end();
    }); */


// 5. Mise à jour de données dans la table evolutions_populations
/* const sql = 'UPDATE evolutions_populations SET population = ?, remarque = ? WHERE id_ville = ? AND annee = ?';
const values = [1100, 'Croissance modérée', 1, 2024];

connection.query(sql, values, (err, result) => {
    if (err) {
        console.error('Erreur lors de la mise à jour :', err);
        return;
    }
    console.log('Données mises à jour avec succès :', result);
}
);

connection.end(); */

// 6. Suppression de données dans la table evolutions_populations
const sql = 'DELETE FROM evolutions_populations WHERE id_ville = ? AND annee = ?';

const values = [1, 2024];

connection.query(sql, values, (err, result) => {
    if (err) {
        console.error('Erreur lors de la suppression :', err);
        return;
    }
    console.log('Données supprimées avec succès :', result);
});

connection.end();











