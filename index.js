const express = require('express');
const connect = require('./config/db');

//creacion de servidor
const app = express();

//conectar a la base de datos
connect();

//puerto de la app
const PORT = process.env.PORT || 4000;



//arrancar app
app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
})