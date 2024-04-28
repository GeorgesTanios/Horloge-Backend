const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('database.sqlite');

// Exécuter la requête SQL pour créer la table "alarms"
db.run(`CREATE TABLE alarms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  time TEXT NOT NULL,
  sound TEXT NOT NULL,
  message TEXT NOT NULL,
  isActive BOOLEAN NOT NULL DEFAULT 1,
  repeat TEXT
);`);

console.log('Table "alarms" créée avec succès');