const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');

exports.crearTarea = async(req,res)=>{
    const {proyecto:idProyecto} = req.body;
    try {
        //Verificar que el proyecto de la tarea existe
        const proyecto = await Proyecto.findById(idProyecto);
        if(!proyecto) return res.status(404).json({ok:false,msg:'No existe el proyecto con el que se quiere crear la tarea'});

        //Revisar que el proyectoa actual pertenece al usuario autenticado
        if(proyecto.creador.toString() !== req.usuario.id) return res.status(401).json({ok:false,msg:'No autorizado'});

        //Crear una nueva tarea
        const tarea = new Tarea(req.body);

        //guardar proyecto
        await tarea.save();

        //response
        res.status(200).json({ok:true,msg:'Tarea agregada',data:tarea})
    } catch (error) {
        console.log(error);
        res.status(400).json({ok:false,msg:'Hubo un error'})
    }
}

exports.obtenerTareas = async (req,res)=>{
    const {id:idProyecto} = req.params;
    try {
         //Verificar que el proyecto de la tarea existe
         const proyecto = await Proyecto.findById(idProyecto);
         if(!proyecto) return res.status(404).json({ok:false,msg:'No existe el proyecto'});
 
         //Revisar que el proyecto actual pertenece al usuario autenticado
         if(proyecto.creador.toString() !== req.usuario.id) return res.status(401).json({ok:false,msg:'No autorizado'});
 
        const tareas = await Tarea.find({proyecto:idProyecto}).sort({creado:-1});//sort los trae desde la fecha mas nueva a la mas vieja
        res.status(200).json({
            ok:true,
            data:tareas
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,msg:'hubo un error'})
    }
}

exports.modificarTarea = async (req,res)=>{
    const {nombre,estado,proyecto:idProyecto} = req.body;
    const {id:idTarea} = req.params;
    const nuevaTarea = {};
    if(nombre) nuevaTarea.nombre = nombre;
    if(estado) nuevaTarea.estado = estado;
    
    try {
        
        //revisar si la tarea existe
        let tarea = await Tarea.findById(idTarea);
        if(!tarea) return res.status(404).json({ok:false,msg:'Tarea no encontrada'})


        const proyecto = await Proyecto.findById(idProyecto);
        //Revisar que el proyecto actual pertenece al usuario autenticado
        if(proyecto.creador.toString() !== req.usuario.id) return res.status(401).json({ok:false,msg:'No autorizado'});

        
        //modificar
        tarea = await Tarea.findOneAndUpdate({_id:idTarea},nuevaTarea,{new:true});

        res.status(200).json({
            ok:true,
            data:tarea
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,msg:'Error en el servidor'})
    }
}

exports.eliminarTarea = async(req,res)=>{
    const {id:idTarea} = req.params;
    try {
        //revisar ID
        let tarea = await Tarea.findById(idTarea);
        
        //Revisar si la tarea existe
        if(!tarea) return res.status(404).json({ok:false,msg:'Proyecto no encontrado'})


        await Tarea.findOneAndRemove({_id:idTarea});
        res.status(200).json({
            ok:true,
            msg:'Tarea eliminada'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,msg:'Error en el servidor'}) 
    }
}