const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const validatorParams = require('../middleware/validatorParams');//middleware para verificar que los campos requeridos no vienen vacios
const {check} = require('express-validator');

router.post('/', auth, [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('proyecto','El proyecto es obligatorio').not().isEmpty()
],validatorParams,tareaController.crearTarea);

router.get('/', auth,tareaController.obtenerTareas);

router.put('/:id',auth,[
    check('nombre','El nombre es obligatorio').not().isEmpty()
],validatorParams,tareaController.modificarTarea);

router.delete('/:id',auth,tareaController.eliminarTarea);

module.exports = router;