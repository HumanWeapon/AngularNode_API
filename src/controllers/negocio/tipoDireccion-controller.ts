import {Request, Response} from 'express';
import { TipoDireccion } from '../../models/negocio/tipoDireccion-models';
import jwt from 'jsonwebtoken';
import db from '../../db/connection'


//Obtiene todos las direcciones de la base de datos
export const getAllTipoDirecciones = async (req: Request, res: Response) => {

    const _direc = await TipoDireccion.findAll();
    res.json(_direc)

}

//Obtiene una direccion de la base de datos     
export const getTipoDireccion = async (req: Request, res: Response) => {
    const { tipo_direccion } = req.body;
try {
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
} catch (error) {
    res.status(400).json({
        msg: 'Contactate con el administrador',
        error
    }); 
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
                msg: 'Dirección ya registrada en la base de datos: '+ tipo_direccion
            })
        }else{
            const newTD = await TipoDireccion.create({
                tipo_direccion: tipo_direccion,
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado: estado
            })
            res.json(newTD)
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
            res.json(_direc);
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
    try {
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
        descripcion: descripcion.toUpperCase(),
        creado_por: creado_por.toUpperCase(),
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por.toUpperCase(),
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json(_direc);

} catch (error) {
    console.error('Error al actualizar el tipo direccion:', error);
    res.status(500).json({
        msg: 'Hubo un error al actualizar el tipo direccion',
    });
}
}

//Inactiva el usuario de la DBA
export const inactivateTipoDireccion = async (req: Request, res: Response) => {
   
    const { tipo_direccion } = req.body;
    try {
        const _direc = await TipoDireccion.findOne({
            where: {tipo_direccion: tipo_direccion}
        });
        if(!_direc){
            return res.status(404).json({
                msg: "El tipo de Direccion no existe: "+ tipo_direccion
            });
        }

        await _direc.update({
            estado: 2
        });
        res.json(_direc);
    } catch (error) {
        console.error('Error al inactivar el tipo de direccion:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el tipo de direccion',
        });
    }
}

//Activa el usuario de la DBA
export const activateTipoDireccion = async (req: Request, res: Response) => {
        
    const { tipo_direccion } = req.body;
    try {
    const _direc = await TipoDireccion.findOne({
        where: {tipo_direccion: tipo_direccion}
    });
    if(!_direc){
        return res.status(404).json({
            msg: "El tipo de Direccion no existe: "+ tipo_direccion
        });
    }

    await _direc.update({
        estado: 1
    });
    res.json(_direc);

} catch (error) {
    console.error('Error al activar el tipo direccion:', error);
    res.status(500).json({
        msg: 'Hubo un error al activar el tipo direccion',
    });
}
}
//Obtiene todas las ciudades activas
export const getTipoDirecciones = async (req: Request, res: Response) => {
    try {
        const query = `
        SELECT id_tipo_direccion, tipo_direccion FROM mipyme.tbl_me_tipo_direccion
        WHERE estado = 1
        `;
        const [results, metadata] = await db.query(query);
        res.json(results);
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}