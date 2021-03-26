const Usuario = require("../models/Usuario");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req,res)=>{
    //Extraer email y password
    const {email,password} = req.body;


    try {
        //Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email});
        if(usuario) return res.status(400).json({ok:false,msg:'El usuario ya existe'});

        //crea nuevo usuario
        usuario = new Usuario(req.body);

        //hashear password
        const salt = await bcrypt.genSalt(10); //a mayor valor, consume mas memoria del servidor
        usuario.password = await bcrypt.hash(password,salt);

        //guardar nuevo usuario
        await usuario.save();

        //Crear y firmar el JWT
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
            msg:'Hubo un error'
        })
    }
}