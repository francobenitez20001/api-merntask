const Proyecto = require('../models/Proyecto');
exports.crearProyecto = async(req,res)=>{
    try {
        //Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        //guardar creador via JWT
        proyecto.creador = req.usuario.id;

        //guardar proyecto
        await proyecto.save();

        //response
        res.status(200).json({ok:true,msg:'Proyecto agregado',data:proyecto})
    } catch (error) {
        console.log(error);
        res.status(400).json({ok:false,msg:'Hubo un error'})
    }
}

exports.obtenerProyectos = async (req,res)=>{
    try {
        const proyectos = await Proyecto.find({creador:req.usuario.id}).sort({creado:-1});//sort los trae desde la fecha mas nueva a la mas vieja
        res.status(200).json({
            ok:true,
            data:proyectos
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,msg:'hubo un error'})
    }
}