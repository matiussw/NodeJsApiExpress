const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.get('/hola/aprende/apis', (req, res) => {
  res.send('Hello World!');
});

// Datos de ejemplo
const usuarios = [
  { id: 1, nombre: 'Mateo', rol: 'Cloud' },
  { id: 2, nombre: 'Ana', rol: 'Developer' },
];

// GET - Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  res.json({ success: true, data: usuarios });
});

// GET - Obtener un usuario por ID
app.get('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  } else {
    res.json({ success: true, data: usuario });
  }

});

app.listen(port, () => { console.log("Server esta arriba" + port) });

