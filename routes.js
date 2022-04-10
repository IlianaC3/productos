const express = require('express');
const app = express();
app.use(express.json());
const Productos = require('./Productos.js');
let Producto = new Productos('productos.txt');

app.get('/',(req, res, next) =>{
    res.status(200).json({
        message: "Bienvenidos"
    });
});

app.get('/productos',(req, res, next) =>{
    Producto.productos().then(result => {
        if (result !== undefined) {
            res.status(200).json({
                message: `Productos`,
                result: result
            });
        } else {
            res.status(404).json({
                message: `Error al leer archivo`,
            });
        }
    });
    
});

app.get('/productoRandom/:id',(req, res, next) => {
    let id = req.params.id;
    Producto.productoRandom(id).then(result => {
        if (result !== undefined) {
            if (result === null) {
                res.status(404).json({
                    message: `No existe el producto`,
                });
            } else {
                res.status(200).json({
                    message: `Producto ID: ${id}`,
                    result: result
                });
            }
        } else {
            res.status(404).json({
                message: `El archivo no se puede leer`,
            });
        }
    });
});

app.use((req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
