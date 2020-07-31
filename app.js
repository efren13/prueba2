'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//rutas

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors

//rutas
app.get('/pruebas', (req, res) => {
    console.log(req);
    res.status(200).send({
        message: 'accion de prueba en el servidor npdejs'
    });
});

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hola mundo'
    });
});

//exportar
module.exports = app;
