import {Request, Response} from 'express';
import { Objetos } from '../models/objetos-models';
import jwt from 'jsonwebtoken';


//Obtiene todos los objetos de la base de datos
export const getAllObjetos = async (req: Request, res: Response) => {

    const _objetos = await Objetos.findAll();
    res.json(_objetos)

}

//Obtiene un objeto de la base de datos
export const getObjeto = async (req: Request, res: Response) => {
    const { objeto } = req.body;

    const _objeto = await Objetos.findOne({
        where: {objeto: objeto}
    });
    if(_objeto){
        res.json({_objeto})
    }
    else{
        res.status(404).json({
            msg: `el  objeto no existe: ${objeto}`
        })
    }
}

//Inserta un objeto en la base de datos
export const postObjeto = async (req: Request, res: Response) => {

    const { objeto, descripcion, tipo_objeto, creado_por, fecha_creacion, modificado_por, fecha_modificacion  } = req.body;

    try{
        const _objeto = await Objetos.findOne({
            where: {objeto: objeto}
        })
    
        if (_objeto){
            return res.status(400).json({
                msg: 'Objeto ya registrado en la base de datos: '+ objeto
            })
        }else{
            await Objetos.create({
                objeto: objeto,
                descripcion: descripcion, 
                tipo_objeto: tipo_objeto,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion
            })
            res.json({
                msg: 'El Objeto: '+ objeto+  ' ha sido creada exitosamente',
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

//Elimina un objeto de la base de datos
export const deleteObjeto = async (req: Request, res: Response) => {
    const { id_objeto } = req.body;

    try {
        const _objeto = await Objetos.findOne({
            where: { id_objeto: id_objeto }
        });

        if (_objeto) {
            await _objeto.destroy();
            res.json({
                msg: 'El objeto con el ID: ' + id_objeto + ' ha sido eliminado exitosamente',
            });
        } else {
            res.status(404).json({
                msg: 'No se encontró un objeto con el ID ' + id_objeto,
            });
        }
    } catch (error) {
        console.error('Error al eliminar el parámetro:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el parámetro',
        });
    }
};


//actualiza el rol en la base de datos
export const updateObjetos = async (req: Request, res: Response) => {
    const { id_objeto, objeto, descripcion, tipo_objeto, creado_por, fecha_creacion, modificado_por, fecha_modificacion  } = req.body;

    const _objeto = await Objetos.findOne({
        where: {id_objeto: id_objeto}
    });
    if(!_objeto){
        return res.status(404).json({
            msg: 'Objeto con el ID: '+ id_objeto +' no existe en la base de datos'
        });
    }

    await _objeto.update({
        id_objeto: id_objeto,
        objeto: objeto,
        descripcion: descripcion, 
        tipo_objeto: tipo_objeto,
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion
    });
    res.json({
        msg: 'El Objeto con el ID: '+ id_objeto+  ' ha sido actualizado exitosamente',
    });
}