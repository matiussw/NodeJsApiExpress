const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error('Error conectando:', err.message);
  else console.log('Base de datos conectada');
});

 db.serialize(() => {

  db.run(`CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    precio REAL,
    descripcion TEXT,
    stock INTEGER,
    categoria TEXT
  )`);

  db.run(`INSERT INTO productos 
  (nombre, precio, descripcion, stock, categoria) 
  VALUES (?, ?, ?, ?, ?)`,
  ['Pc', 1000, 'Computador de Mesa', 10, 'Electronico']);

});

db.run(`CREATE TABLE IF NOT EXISTS peritos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT,
  Email TEXT
)`
);


module.exports= db