const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'performance_schema',
    port: 3308 // Updated port


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