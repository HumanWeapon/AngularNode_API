import { Request, Response } from 'express';
import { Objetos } from '../models/objetos-models';
import jwt from 'jsonwebtoken';

// Obtiene todos los objetos de la base de datos
export const getAllObjetos = async (req: Request, res: Response) => {
    try {
        const _objetos = await Objetos.findAll();
        res.json(_objetos);
    } catch (error) {
        console.error('Error al obtener todos los objetos de la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Obtiene un objeto de la base de datos
export const getObjeto = async (req: Request, res: Response) => {
    try {
        const { objeto } = req.body;

        const _objeto = await Objetos.findOne({
            where: { objeto: objeto }
        });

        if (_objeto) {
            res.json({ _objeto });
        } else {
            res.status(404).json({
                msg: `El objeto no existe: ${objeto}`
            });
        }
    } catch (error) {
        console.error('Error al obtener un objeto de la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Inserta un objeto en la base de datos
export const postObjeto = async (req: Request, res: Response) => {
    try {
        const { objeto, descripcion, tipo_objeto, estado_objeto, creado_por, fecha_creacion, modificado_por, fecha_modificacion } = req.body;

        const _objeto = await Objetos.findOne({
            where: { objeto: objeto }
        });

        if (_objeto) {
            return res.status(400).json({
                msg: 'Objeto ya registrado en la base de datos: ' + objeto
            });
        } else {
            await Objetos.create({
                objeto: objeto,
                descripcion: descripcion,
                tipo_objeto: tipo_objeto,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado_objeto: estado_objeto
            });

            res.json(`El Objeto: ${objeto} ha sido creada exitosamente`);
        }
    } catch (error) {
        console.error('Error al insertar un objeto en la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Elimina un objeto de la base de datos
export const deleteObjeto = async (req: Request, res: Response) => {
    try {
        const { id_objeto } = req.body;

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
        console.error('Error al eliminar un objeto de la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
};

// Actualiza el objeto en la base de datos
export const updateObjetos = async (req: Request, res: Response) => {
    try {
        const { id_objeto, objeto, descripcion, tipo_objeto, creado_por, fecha_creacion, modificado_por, fecha_modificacion } = req.body;

        const _objeto = await Objetos.findOne({
            where: { id_objeto: id_objeto }
        });

        if (!_objeto) {
            return res.status(404).json({
                msg: 'El objeto con el ID: ' + id_objeto + ' no existe en la base de datos'
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

        res.json(`El Objeto con el ID: ${id_objeto} ha sido actualizado exitosamente`);
    } catch (error) {
        console.error('Error al actualizar un objeto en la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Inactiva el objeto en la DBA
export const inactivateObjecto = async (req: Request, res: Response) => {
    try {
        const { objeto } = req.body;

        const _objeto = await Objetos.findOne({
            where: { objeto: objeto }
        });

        if (!_objeto) {
            return res.status(404).json({
                msg: `El Objeto no existe: ${objeto}`
            });
        }

        await _objeto.update({
            estado_objeto: 2
        });

        res.json(`Objeto: ${objeto} inactivado exitosamente`);
    } catch (error) {
        console.error('Error al inactivar un objeto en la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Activa el objeto en la DBA
export const activateObjeto = async (req: Request, res: Response) => {
    try {
        const { objeto } = req.body;

        const _objeto = await Objetos.findOne({
            where: { objeto: objeto }
        });

        if (!_objeto) {
            return res.status(404).json({
                msg: `El Objeto no existe: ${objeto}`
            });
        }

        await _objeto.update({
            estado_objeto: 1
        });

        res.json({
            msg: `Objeto: ${objeto} ha sido activado exitosamente`,
        });
    } catch (error) {
        console.error('Error al activar un objeto en la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Obtiene todos los objetos de la base de datos filtrados por tipo y estado
export const getAllObjetosMenu = async (req: Request, res: Response) => {
    try {
        const { tipo_objeto, estado_objeto } = req.body;

        const _objetos = await Objetos.findAll({
            where: { tipo_objeto: tipo_objeto, estado_objeto: estado_objeto }
        });

        if (_objetos) {
            res.json(_objetos);
        } else {
            res.status(404).json({
                msg: `No se encontraron objetos para el tipo ${tipo_objeto} y estado ${estado_objeto}`
            });
        }
    } catch (error) {
        console.error('Error al obtener objetos filtrados por tipo y estado:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}
