import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { Pyme } from '../../models/negocio/pyme-models';
import jwt from 'jsonwebtoken';

//Obtiene todas las Pymes
export const getAllPymes = async (req: Request, res: Response) => {
    const pyme = await Pyme.findAll();
    res.json(pyme)
}

//Obtiene una Pyme por ID
export const getPyme = async (req: Request, res: Response) => {
    const { id_pyme } = req.body;

    const _pyme = await Pyme.findOne({
        where: {id_pyme: id_pyme}
    });
    if(_pyme){
        res.json(_pyme)
    }
    else{
        res.status(404).json({
            msg: `el ID de la pregunta no existe: ${id_pyme}`
        })
    }
}

// Inserta una nueva Pyme en la base de datos
export const postPyme = async (req: Request, res: Response) => {

    const { nombre_pyme, id_tipo_empresa, categoria, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado} = req.body;

    try{
        const _pyme = await Pyme.findOne({
            where: {nombre_pyme: nombre_pyme}
        })
    
            await Pyme.create({
                id_tipo_empresa:id_tipo_empresa,
                nombre_pyme: nombre_pyme,
                categoria: categoria,
                descripcion: descripcion, 
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            })
            res.json({
                msg: 'La Pyme: '+ nombre_pyme+  ' ha sido creada exitosamente',
            })
        
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}

// Elimina la Pyme de la base de datos
export const deletePyme = async (req: Request, res: Response) => {
    const { id_pyme } = req.body; // Obtén el ID desde los parámetros de la URL

    try {
        const _pyme = await Pyme.findOne({
            where: { id_pyme: id_pyme}
        });

        if (_pyme) {
            await _pyme.destroy();
            res.json({
                msg: 'La Pyme con el ID: ' + id_pyme + ' ha sido eliminado exitosamente',
            });
        } else {
            res.status(404).json({
                msg: 'No se encontró una Pyme con el ID ' + id_pyme,
            });
        }
    } catch (error) {
        console.error('Error al eliminar la Pyme:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la Pyme',
        });
    }
};

//actualiza el Telefono en la base de datos
export const updatePyme = async (req: Request, res: Response) => {
    const { id_pyme, nombre_pyme, id_tipo_empresa, categoria, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

    const _pyme = await Pyme.findOne({
        where: {id_pyme: id_pyme}
    });
    if(!_pyme){
        return res.status(404).json({
            msg: 'Pyme con el ID: '+ id_pyme +' no existe en la base de datos'
        });
    }

    await _pyme.update({

        id_pyme:id_pyme,
        nombre_pyme: nombre_pyme,
        id_tipo_empresa:id_tipo_empresa,
        categoria: categoria,
        descripcion: descripcion, 
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
        
    });
    res.json({
        msg: 'La Pyme con el ID: '+ id_pyme+  ' ha sido actualizado exitosamente',
    });
}