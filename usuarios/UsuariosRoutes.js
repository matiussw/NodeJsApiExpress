const express = require('express');
const router = express.Router();

// Datos de ejemplo
const usuarios = [
    { id: 1, nombre: 'Mateo', rol: 'Cloud' },
    { id: 2, nombre: 'Ana', rol: 'Developer' },
];

// GET - Obtener todos los usuarios
router.get('/usuarios', (req, res) => {
     const apiKey = req.headers['password'];
    if (!apiKey) {
        res.status(401).json(
            {
                success: false, message:
                    'API key es requerida'
            });
    }
    if (apiKey !== 'Hola Mundo') {
        res.status(403).json(
            {
                success: false, message:
                    'Error la password no es correcta'
            });
    }

    res.json({ success: true, data: usuarios });
});

// GET - Obtener un usuario por ID
router.get('/usuarios/:id', (req, res) => {
     const apiKey = req.headers['password'];
    if (!apiKey) {
        res.status(401).json(
            {
                success: false, message:
                    'API key es requerida'
            });
    }
    if (apiKey !== 'Hola Mundo') {
        res.status(403).json(
            {
                success: false, message:
                    'Error la password no es correcta'
            });
    }

    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    } else {
        res.json({ success: true, data: usuario });
    }
});

module.exports = router;
