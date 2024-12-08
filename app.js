const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'population_ville'
});


connection.connect(err => {
    if (err) {
        console.error('Erreur de connexion :', err);
    return;
    }

console.log('Connexion réussie à MySQL !');
});
// Fermez la connexion une fois terminé
connection.end();