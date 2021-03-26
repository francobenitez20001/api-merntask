const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const validatorParams = require('../middleware/validatorParams');//middleware para verificar que los campos requeridos no vienen vacios
const {check} = require('express-validator');

router.post('/', auth, [
    check('nombre','El nombre es obligatorio').not().isEmpty()
],validatorParams,proyectoController.crearProyecto);

router.get('/', auth,proyectoController.obtenerProyectos);

module.exports = router;