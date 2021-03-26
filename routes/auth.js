//Rutas para autenticacipon

const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const validatorParams = require('../middleware/validatorParams');

router.post('/',[
    check('email','Agrega un email valido').isEmail(),
    check('password','El password debe ser mínimo de 6 caracteres').isLength({min:6})
],validatorParams,authController.login);

module.exports = router;