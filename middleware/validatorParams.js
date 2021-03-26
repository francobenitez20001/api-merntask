const {validationResult} = require('express-validator');

module.exports = function (req,res,next) {
    const errores = validationResult(req);//devueve en formato de array
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok:false,
            msg:errores.array()
        })
    }
    next();
}