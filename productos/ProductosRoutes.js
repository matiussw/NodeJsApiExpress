const express = require('express');
const router = express.Router();
const db = require('../db');
const productos = [
    { id: 1, nombre: 'Pc', precio: 2000, descripcion: 'Computadora de escritorio', stock: 10, categoria: 'Computacion' },
    { id: 2, nombre: 'Laptop', precio: 3000, descripcion: 'Computadora portátil', stock: 5, categoria: 'Electrónica' },
    { id: 3, nombre: 'Mouse', precio: 50, descripcion: 'Mouse inalámbrico', stock: 20, categoria: 'Electrónica' }
];


router.get('/productos', (req, res) => {

    const { nombre, precio, descripcion, stock, categoria } = req.query;
    let filteredProducts = productos.filter(p => {
        return ((!nombre || p.nombre.toLowerCase().includes(nombre.toLowerCase())) &&
            (!precio || p.precio === parseFloat(precio)) &&
            (!descripcion || p.descripcion.toLowerCase().includes(descripcion.toLowerCase())) &&
            (!stock || p.stock === parseInt(stock)) &&
            (!categoria || p.categoria.toLowerCase().includes(categoria.toLowerCase()))
        )
    }
    );
    res.json({ success: true, data: filteredProducts });
});

// GET - Obtener un producto por ID
router.get('/productos/:id', (req, res) => {
    const product = productos.find(u => u.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ success: false, message: 'Producto  no encontrado' });
    } else {
        res.json({ success: true, data: product });
    }
});

router.post('/productos', (req, res) => {
    const { nombre, precio, descripcion, stock, categoria } = req.body;
    db.run('INSERT INTO productos (nombre, precio, descripcion, stock, categoria) VALUES (?,?,?,?,?)',
        [nombre, precio, descripcion, stock, categoria]
       
    );
     res.status(201).json({success :true})
});

router.put('/productos/:id', (req, res) => {
    const { nombre, precio, descripcion, stock, categoria } = req.body;

    if (!nombre || !precio || !descripcion || !stock || !categoria) {
        return res.status(400).json({ success: false, message: 'Faltan datos requeridos' });
    }


    const index = productos.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    const productoActualizado = {
        id: productos[index].id,
        nombre,
        precio,
        descripcion,
        stock,
        categoria
    };

    productos[index] = productoActualizado;
    res.json({ success: true, data: productoActualizado });
});

router.delete('/productos/:id', (req, res) => {

    const productIndex = productos.findIndex(u => u.id === parseInt(req.params.id));
    if (productIndex === -1) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }
    productos.splice(productIndex, 1);

    res.status(201).json({ success: true, data: "El Producto se ha eliminado" });
});


module.exports = router;    