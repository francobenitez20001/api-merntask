//Rutas para usuarios

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {check} = require('express-validator');
const validatorParams = require('../middleware/validatorParams');

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),//reciba el dato con el nombre 'nombre' que no este vacio
    check('email','Agrega un email valido').isEmail(),
    check('password','El password debe ser mínimo de 6 caracteres').isLength({min:6})
],validatorParams,usuarioController.crearUsuario);

module.exports = router;