const Usuario = require("../models/Usuario");
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.login = async (req,res)=>{
    const errores = validationResult(req);//devueve en formato de array
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok:false,
            msg:errores.array()
        })
    }

    //Extraer email y password
    const {email,password} = req.body;
    try {
        //Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario) return res.status(400).json({ok:false,msg:'El usuario no existe'});

        //Revisar su password
        const passCorrecto =  await bcrypt.compare(password,usuario.password);
        if(!passCorrecto) return res.status(400).json({ok:false,msg:'Password incorrecto'});

        //Si todo esta OK, crear y firmar JWT
        const payload = {
            usuario:{
                id:usuario.id
            }
        };

        //firmar token
        jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:3600 //UNA HORA   
        },(error,token)=>{
            if(error) throw error;

            //Mensaje de confirmacion
            res.status(200).json({
                ok:true,
                token
            })
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'Ha ocurrido un error'
        })
    }
}