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
                msg: 'Tipo de requisito ya registrado en la base de datos: '
            })
        }else{
            await Tipo_Requisito.create({                
                tipo_requisito: tipo_requisito,
                descripcion: descripcion,                 
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            })
            res.json({
                msg: 'El tipo requisito ha sido creada exitosamente',
            })
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
            res.json({
                msg: 'El tipo requisito ha sido eliminado exitosamente',
            });
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
        descripcion: descripcion,                
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado
    });
    res.json({
        msg: 'El valor ha sido actualizado exitosamente',
    });
}