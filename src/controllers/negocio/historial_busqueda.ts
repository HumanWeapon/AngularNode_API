import {Request, Response} from 'express';
import { Objetos } from '../../models/objetos-models';
import { Historial_Busqueda } from '../../models/negocio/historial_busqueda';
import { where } from 'sequelize';

//Obtiene todos los registros de la base de datos
export const getAllHistorialB = async (req: Request, res: Response) => {
    try {
        const HistB = await Historial_Busqueda.findAll();
        res.json(HistB)
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}

//Obtiene un historial por ID
export const getHistorialB = async (req: Request, res: Response) => {
    const { id_historial } = req.body;
try {

    const _HistB = await Historial_Busqueda.findAll({
        where: {id_historial: id_historial}
    });
    if(_HistB){
        res.json(_HistB)
    }
    else{
        res.status(404).json({
            msg: `el ID del Pais no existe: ${id_historial}`
        })
    }

} catch (error) {
    res.status(400).json({
        msg: 'Contactate con el administrador',
        error
    }); 
}
}

// Inserta una nuevo registro en la base de datos
export const postHistorialB = async (req: Request, res: Response) => {

    const {  id_historial, id_pyme, id_producto, id_pais, id_empresa, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado} = req.body;

    try{
        const _HistB = await Historial_Busqueda.findOne({
            where: {id_historial: id_historial},
        })

        if (_HistB){
            return res.status(400).json({
                msg: 'Registro ya existe en la base de datos: '+ id_historial
            })
        }else{
    
            const HistB = await Historial_Busqueda.create({
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: Date.now(),
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: Date.now(),
                estado: estado
            })
            return res.json(HistB);
        }    
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}

// Elimina el Pais de la base de datos
export const deleteHistorialB = async (req: Request, res: Response) => {
    const { id_historial } = req.body; // Obtén el ID desde los parámetros de la URL

    try {
        const _HistB = await Historial_Busqueda.findOne({
            where: { id_historial: id_historial}
        });

        if (_HistB) {
            await _HistB.destroy();
            res.json(_HistB);
        } else {
            res.status(404).json({
                msg: 'No se encontró registro con el ID ' + id_historial,
            });
        }
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el registro',
        });
    }
};

//actualiza el Telefono en la base de datos
export const updateHistorialB = async (req: Request, res: Response) => {
   
    const {  id_historial, id_pyme, id_producto, id_pais, id_empresa, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado}= req.body;
    try {
    const _HistB = await Historial_Busqueda.findOne({
        where: {id_historial: id_historial}
    });
    if(!_HistB){
        return res.status(404).json({
            msg: 'Registro con el ID: '+ id_historial +' no existe en la base de datos'
        });
    }

    await _HistB.update({
        id_pyme: id_pyme,
        id_producto: id_producto,
        id_pais: id_pais,
        id_empresa: id_empresa,
        descripcion: descripcion.toUpperCase(),
        creado_por: creado_por.toUpperCase(),
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por.toUpperCase(),
        fecha_modificacion: fecha_modificacion,
        estado: estado
        
    });
    res.json(_HistB);

} catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({
        msg: 'Hubo un error al actualizar el registro',
    });
}
}

//Inactiva el registro de la DBA
export const inactivateHistorialB = async (req: Request, res: Response) => {
    
    const { id_historial } = req.body;
    try {
    const HistB = await Historial_Busqueda.findOne({
        where: {id_historial: id_historial}
    });
    if(!HistB){
        return res.status(404).json({
            msg: "El registro no existe: "+ id_historial
        });
    }

    await HistB.update({
        estado: 2
    });
    res.json(HistB);

} catch (error) {
    console.error('Error al inactivar el registro:', error);
    res.status(500).json({
        msg: 'Hubo un error al inactivar el registro',
    });
}
}

//Activa el registro  de la DBA
export const activateHistorialB = async (req: Request, res: Response) => {
    
    const { id_historial } = req.body;
    try {
    const HistB = await Historial_Busqueda.findOne({
        where: {id_historial: id_historial}
    });
    if(!HistB){
        return res.status(404).json({
            msg: "El registro no existe: "+ id_historial
        });
    }

    await HistB.update({
        estado: 1
    });
    res.json(HistB);

} catch (error) {
    console.error('Error al activar el registro:', error);
    res.status(500).json({
        msg: 'Hubo un error al activar el registro',
    });
}
}