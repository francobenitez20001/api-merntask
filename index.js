const express = require('express');
const connect = require('./config/db');
const cors = require('cors');

//creacion de servidor
const app = express();

//conectar a la base de datos
connect();

//habilitar cors
app.use(cors())

// Habilitar express.json
app.use(express.json({extended:true}));

//puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyectos'));
app.use('/api/tareas',require('./routes/tareas'));

//arrancar app
app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
})