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

exports.modificarProyecto = async (req,res)=>{
    const {nombre} = req.body;
    const {id:idProyecto} = req.params;
    const nuevoProyecto = {};
    if(nombre){
        nuevoProyecto.nombre = nombre;
    }
    try {
        //revisar ID
        let proyecto = await Proyecto.findById(idProyecto);
        
        //Revisar si el proyecto existe
        if(!proyecto) return res.status(404).json({ok:false,msg:'Proyecto no encontrado'})

        // verificar creador del proyecto
        /*el campo creado viene como object. por eso se pasa a string y se compara para saber si es igual al id del usuario que viene en el header de la peticion (JWT)*/
        if(proyecto.creador.toString() !== req.usuario.id) return res.status(401).json({ok:false,msg:'No autorizado'});

        //modificar
        proyecto = await Proyecto.findByIdAndUpdate({_id:idProyecto},{$set:nuevoProyecto},{new:true});

        res.status(200).json({
            ok:true,
            data:proyecto
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,msg:'Error en el servidor'})
    }
}

exports.eliminarProyecto = async(req,res)=>{
    const {id:idProyecto} = req.params;
    try {
        //revisar ID
        let proyecto = await Proyecto.findById(idProyecto);
        
        //Revisar si el proyecto existe
        if(!proyecto) return res.status(404).json({ok:false,msg:'Proyecto no encontrado'})

        // verificar creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id) return res.status(401).json({ok:false,msg:'No autorizado'});

        await Proyecto.findOneAndRemove({_id:idProyecto});
        res.status(200).json({
            ok:true,
            msg:'Proyecto eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,msg:'Error en el servidor'}) 
    }
}