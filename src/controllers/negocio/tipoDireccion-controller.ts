import {Request, Response} from 'express';
import { TipoDireccion } from '../../models/negocio/tipoDireccion-models';
import jwt from 'jsonwebtoken';


//Obtiene todos las direcciones de la base de datos
export const getAllTipoDirecciones = async (req: Request, res: Response) => {

    const _direc = await TipoDireccion.findAll();
    res.json(_direc)

}

//Obtiene una direccion de la base de datos     
export const getTipoDireccion = async (req: Request, res: Response) => {
    const { tipo_direccion } = req.body;

    const _direc = await TipoDireccion.findOne({
        where: {tipo_direccion: tipo_direccion}
    });
    if(_direc){
        res.json({_direc})
    }
    else{
        res.status(404).json({
            msg: `La dirección no existe: ${tipo_direccion}`
        })
    }
}

//Inserta una direccion en la base de datos
export const postTipoDireccion = async (req: Request, res: Response) => {

    const { tipo_direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

    try{
        const _direc = await TipoDireccion.findOne({
            where: {tipo_direccion: tipo_direccion}
        })
    
        if (_direc){
            return res.status(400).json({
                msg: 'dirección ya registrada en la base de datos: '+ tipo_direccion
            })
        }else{
            await TipoDireccion.create({
                tipo_direccion: tipo_direccion,
                descripcion: descripcion, 
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            })
            res.json({
                msg: 'La dirección: '+ tipo_direccion+  ' ha sido creada exitosamente',
            })
        }
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
    /*// Generamos token
    const token = jwt.sign({
        usuario: usuario
    }, process.env.SECRET_KEY || 'Lamers005*');
    res.json(token);*/
}

//Elimina una direccion de la base de datos
export const deleteTipoDireccion = async (req: Request, res: Response) => {
    const { id_tipo_direccion } = req.body;

    try {
        const _direc = await TipoDireccion.findOne({
            where: { id_tipo_direccion: id_tipo_direccion }
        });

        if (_direc) {
            await _direc.destroy();
            res.json({
                msg: 'La dirección con el ID: ' + id_tipo_direccion + ' ha sido eliminada exitosamente',
            });
        } else {
            res.status(404).json({
                msg: 'No se encontró una dirección con el ID ' + id_tipo_direccion,
            });
        }
    } catch (error) {
        console.error('Error al eliminar el dirección:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la dirección',
        });
    }
};


//actualiza la dirección en la base de datos
export const updateTipoDireccion = async (req: Request, res: Response) => {
    const { id_tipo_direccion, tipo_direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado  } = req.body;

    const _direc = await TipoDireccion.findOne({
        where: {id_tipo_direccion: id_tipo_direccion}
    });
    if(!_direc){
        return res.status(404).json({
            msg: 'dirección con el ID: '+ id_tipo_direccion +' no existe en la base de datos'
        });
    }

    await _direc.update({
        id_tipo_direccion: id_tipo_direccion,
        tipo_direccion: tipo_direccion,
        descripcion: descripcion, 
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json({
        msg: 'La dirección con el ID: '+ id_tipo_direccion+  ' ha sido actualizado exitosamente',
    });
}















/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */