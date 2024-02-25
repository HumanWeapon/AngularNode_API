import {Request, Response} from 'express';
import { TipoContacto } from '../../models/negocio/tipoContacto-models';
import jwt from 'jsonwebtoken';


//Obtiene todos los contacto de la base de datos
export const getAllTipoContactos = async (req: Request, res: Response) => {

    const _cont = await TipoContacto.findAll();
    res.json(_cont)

}

//Obtiene todos los contactos activos de la base de datos
export const getAllTipoContactosActivos = async (req: Request, res: Response) => {

    const _cont = await TipoContacto.findAll({
        where: { estado: 1 }
    });
    res.json(_cont);
}

//Obtiene un contacto de la base de datos     
export const getTipoContacto = async (req: Request, res: Response) => {
    const { tipo_contacto } = req.body;
try {
    const _cont = await TipoContacto.findOne({
        where: {tipo_contacto: tipo_contacto}
    });
    if(_cont){
        res.json({_cont})
    }
    else{
        res.status(404).json({
            msg: `El Contacto no existe: ${tipo_contacto}`
        })
    }

} catch (error) {
    res.status(400).json({
        msg: 'Contactate con el administrador',
        error
    }); 
}
}

//Inserta un contacto en la base de datos
export const postTipoContacto = async (req: Request, res: Response) => {

    const { tipo_contacto, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

    try{
        const _cont = await TipoContacto.findOne({
            where: {tipo_contacto: tipo_contacto}
        })
    
        if (_cont){
            return res.status(400).json({
                msg: 'Contacto ya registrado en la base de datos: '+ tipo_contacto
            })
        }else{
            const newTC = await TipoContacto.create({
                tipo_contacto: tipo_contacto,
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado: estado
            })
            res.json(newTC)
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

//Elimina un contacto de la base de datos
export const deleteTipoContacto = async (req: Request, res: Response) => {
    const { id_tipo_contacto } = req.body;

    try {
        const _cont = await TipoContacto.findOne({
            where: { id_tipo_contacto: id_tipo_contacto }
        });

        if (_cont) {
            await _cont.destroy();
            res.json(_cont);
        } else {
            res.status(404).json({
                msg: 'No se encontró un contacto con el ID ' + id_tipo_contacto,
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
export const updateTipoContacto = async (req: Request, res: Response) => {
    
    const { id_tipo_contacto, tipo_contacto, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado  } = req.body;
    try {
    const _cont = await TipoContacto.findOne({
        where: {id_tipo_contacto: id_tipo_contacto}
    });
    if(!_cont){
        return res.status(404).json({
            msg: 'contacto con el ID: '+ id_tipo_contacto +' no existe en la base de datos'
        });
    }

    await _cont.update({
        id_tipo_contacto: id_tipo_contacto,
        tipo_contacto: tipo_contacto,
        descripcion: descripcion.toUpperCase(),
        creado_por: creado_por.toUpperCase(),
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por.toUpperCase(),
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json(_cont);

} catch (error) {
    console.error('Error al actualizar el tipo de contacto:', error);
    res.status(500).json({
        msg: 'Hubo un error al actualizar el tipo de contacto',
    });
}
}

//Inactiva el usuario de la DBA
export const inactivateTipoContacto = async (req: Request, res: Response) => {
  
    const { tipo_contacto } = req.body;
    try {
    const _cont = await TipoContacto.findOne({
        where: {tipo_contacto: tipo_contacto}
    });
    if(!_cont){
        return res.status(404).json({
            msg: "El Tipo de Contacto no existe: "+ tipo_contacto
        });
    }

    await _cont.update({
        estado: 2
    });
    res.json(_cont);

} catch (error) {
    console.error('Error al inactivar el tipo contacto:', error);
    res.status(500).json({
        msg: 'Hubo un error al inactivar el tipo contacto',
    });
}
}

//Activa el usuario de la DBA
export const activateTipoContacto = async (req: Request, res: Response) => {
    
    const { tipo_contacto } = req.body;
    try {
    const _cont = await TipoContacto.findOne({
        where: {tipo_contacto: tipo_contacto}
    });
    if(!_cont){
        return res.status(404).json({
            msg: "El tipo de Contacto no existe: "+ tipo_contacto
        });
    }

    await _cont.update({
        estado: 1
    });
    res.json(_cont);
} catch (error) {
    console.error('Error al activar el tipo contacto:', error);
    res.status(500).json({
        msg: 'Hubo un error al activar el tipo contacto',
    });
}
}











/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */