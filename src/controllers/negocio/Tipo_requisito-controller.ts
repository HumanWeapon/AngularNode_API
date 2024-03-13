import {Request, Response} from 'express';
import { Tipo_Requisito } from '../../models/negocio/Tipo_requisito-models';
import { where } from 'sequelize';

//Obtiene todos los tipos de requisito de la base de datos
export const getAllTipo_Requisito = async (req: Request, res: Response) => {

    const t_requisito = await Tipo_Requisito.findAll();
    res.json(t_requisito)

}
//Obtiene un tipo de requisito de la base de datos
export const getTipo_Requisito = async (req: Request, res: Response) => {
    const { tipo_requisito } = req.body;
try {
    const _tiporeq = await Tipo_Requisito.findOne({
        where: {tipo_requisito: tipo_requisito}
    });
    if(_tiporeq){
        res.json({_tiporeq})
    }
    else{
        res.status(404).json({
            msg: `el Id del tipo de permiso no existe: ${tipo_requisito}`
        })
    }
} catch (error) {
    res.status(400).json({
        msg: 'Contactate con el administrador',
        error
    }); 
}
}

//Inserta un tipo_requisito en la base de datos
export const postTipo_Requisito = async (req: Request, res: Response) => {

    const { tipo_requisito, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

    try{
        const _tipreq = await Tipo_Requisito.findOne({
            where: {tipo_requisito: tipo_requisito}
        })
    
        if (_tipreq){
            return res.status(400).json({
                msg: `Tipo de requisito ya registrado en la base de datos: ${tipo_requisito}`
            })
        }else{
            const newTRE = await Tipo_Requisito.create({                
                tipo_requisito: tipo_requisito,
                descripcion: descripcion.toUpperCase(),                
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado: estado
            })
            res.json(newTRE)
        }
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}

//Elimina un tipo_requisito de la base de datos
export const deleteTipo_Requisito = async (req: Request, res: Response) => {
    const { id_tipo_requisito } = req.body;

    try {
        const _tipreq = await Tipo_Requisito.findOne({
            where: { id_tipo_requisito: id_tipo_requisito }
        });

        if (_tipreq) {
            await _tipreq.destroy();
            res.json(_tipreq);
        } else {
            res.status(404).json({
                msg: 'No se encontró ningun registro con esa numeracion',
            });
        }
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el registro',
        });
    }
};

//actualiza el tipo requisito en la base de datos
export const updateTipo_Requisito = async (req: Request, res: Response) => {
   
    const { id_tipo_requisito, tipo_requisito, descripcion, modificado_por, fecha_modificacion, estado  } = req.body;
    try {
    const _tiporeq = await Tipo_Requisito.findOne({
        where: {id_tipo_requisito: id_tipo_requisito}
    });
    if(!_tiporeq){
        return res.status(404).json({
            msg: 'El valor seleccionado no existe en la base de datos'
        });
    }

    await _tiporeq.update({ 
        id_tipo_requisito: id_tipo_requisito,       
        tipo_requisito: tipo_requisito,
        descripcion: descripcion.toUpperCase(),              
        modificado_por: modificado_por.toUpperCase(),
        fecha_modificacion: fecha_modificacion,
        estado
    });
    res.json(_tiporeq);

} catch (error) {
    console.error('Error al actualizar el tipo requisito:', error);
    res.status(500).json({
        msg: 'Hubo un error al actualizar el tipo requisito',
    });
}
}

//Inactiva el usuario de la DBA
export const inactivateRequisito = async (req: Request, res: Response) => {
    
    const { tipo_requisito } = req.body;
    try {
    const tiporeq = await Tipo_Requisito.findOne({
        where: {tipo_requisito: tipo_requisito}
    });
    if(!tiporeq){
        return res.status(404).json({
            msg: "El Requisito no existe: "+ tipo_requisito
        });
    }

    await tiporeq.update({
        estado: 2
    });
    res.json(tiporeq);

} catch (error) {
    console.error('Error al inactivar el requisito de exportacion:', error);
    res.status(500).json({
        msg: 'Hubo un error al inactivar el requisito de exportacion',
    });
}
}

//Activa el usuario de la DBA
export const activateRequisito = async (req: Request, res: Response) => {
    
    const { tipo_requisito } = req.body;
    try {
    const tiporeq = await Tipo_Requisito.findOne({
        where: {tipo_requisito: tipo_requisito}
    });
    if(!tiporeq){
        return res.status(404).json({
            msg: "El Requisito no existe: "+ tipo_requisito
        });
    }

    await tiporeq.update({
        estado: 1
    });
    res.json(tiporeq);

} catch (error) {
    console.error('Error al inactivar el requisito de exportacion:', error);
    res.status(500).json({
        msg: 'Hubo un error al inactivar el requisito de exportacion',
    });
}
}
