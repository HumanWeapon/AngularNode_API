import { Request, Response } from 'express';
import { TipoDireccion } from '../../models/negocio/tipoDireccion-models';
import jwt from 'jsonwebtoken';

// Obtiene todos las direcciones de la base de datos
export const getAllTipoDirecciones = async (req: Request, res: Response) => {
    try {
        const _direc = await TipoDireccion.findAll();
        res.json(_direc);
    } catch (error) {
        console.error('Error al obtener todos los tipos de dirección:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Obtiene una dirección de la base de datos
export const getTipoDireccion = async (req: Request, res: Response) => {
    try {
        const { tipo_direccion } = req.body;

        const _direc = await TipoDireccion.findOne({
            where: { tipo_direccion: tipo_direccion }
        });

        if (_direc) {
            res.json({ _direc });
        } else {
            res.status(404).json({
                msg: `La dirección no existe: ${tipo_direccion}`
            });
        }
    } catch (error) {
        console.error('Error al obtener el tipo de dirección:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Inserta una dirección en la base de datos
export const postTipoDireccion = async (req: Request, res: Response) => {
    try {
        const { tipo_direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

        const _direc = await TipoDireccion.findOne({
            where: { tipo_direccion: tipo_direccion }
        });

        if (_direc) {
            return res.status(400).json({
                msg: 'Dirección ya registrada en la base de datos: ' + tipo_direccion
            });
        } else {
            await TipoDireccion.create({
                tipo_direccion: tipo_direccion,
                descripcion: descripcion,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            res.json({
                msg: 'La dirección: ' + tipo_direccion + ' ha sido creada exitosamente',
            });
        }
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error,
        });
    }
}

// Elimina una dirección de la base de datos
export const deleteTipoDireccion = async (req: Request, res: Response) => {
    try {
        const { id_tipo_direccion } = req.body;

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
        console.error('Error al eliminar la dirección:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la dirección',
            error,
        });
    }
};

// Actualiza la dirección en la base de datos
export const updateTipoDireccion = async (req: Request, res: Response) => {
    try {
        const { id_tipo_direccion, tipo_direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

        const _direc = await TipoDireccion.findOne({
            where: { id_tipo_direccion: id_tipo_direccion }
        });

        if (!_direc) {
            return res.status(404).json({
                msg: 'Dirección con el ID: ' + id_tipo_direccion + ' no existe en la base de datos'
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
            msg: 'La dirección con el ID: ' + id_tipo_direccion + ' ha sido actualizado exitosamente',
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error,
        });
    }
}

// Inactiva el usuario de la DBA
export const inactivateTipoDireccion = async (req: Request, res: Response) => {
    try {
        const { tipo_direccion } = req.body;

        const _direc = await TipoDireccion.findOne({
            where: { tipo_direccion: tipo_direccion }
        });

        if (!_direc) {
            return res.status(404).json({
                msg: "El tipo de Dirección no existe: " + tipo_direccion
            });
        }

        await _direc.update({
            estado: 2
        });
        res.json({
            msg: 'El Tipo de Dirección: ' + tipo_direccion + ' inactivado exitosamente',
        });
    } catch (error) {
        console.error('Error al inactivar el tipo de dirección:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el tipo de dirección',
            error,
        });
    }
}

// Activa el usuario de la DBA
export const activateTipoDireccion = async (req: Request, res: Response) => {
    try {
        const { tipo_direccion } = req.body;

        const _direc = await TipoDireccion.findOne({
            where: { tipo_direccion: tipo_direccion }
        });

        if (!_direc) {
            return res.status(404).json({
                msg: "El tipo de Dirección no existe: " + tipo_direccion
            });
        }

        await _direc.update({
            estado: 1
        });
        res.json({
            msg: 'El tipo de Dirección: ' + tipo_direccion + ' ha sido activado exitosamente',
        });
    } catch (error) {
        console.error('Error al activar el tipo de dirección:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar el tipo de dirección',
            error,
        });
    }
}















/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */