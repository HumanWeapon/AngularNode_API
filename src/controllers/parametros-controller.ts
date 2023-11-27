import { Request, Response } from 'express';
import { Parametros } from '../models/parametros-models';
import jwt from 'jsonwebtoken';

// Obtiene todos los parametros de la base de datos
export const getAllParametros = async (req: Request, res: Response) => {
    try {
        const _parametro = await Parametros.findAll();
        res.json(_parametro);
    } catch (error) {
        console.error('Error al obtener todos los parámetros:', error);
        res.status(500).json({ error: 'Error al obtener todos los parámetros' });
    }
};

// Obtiene un parametro de la base de datos
export const getParametro = async (req: Request, res: Response) => {
    const { id_parametro } = req.body;

    try {
        const _parametro = await Parametros.findOne({
            where: { id_parametro: id_parametro },
        });

        if (_parametro) {
            res.json({ _parametro });
        } else {
            res.status(404).json({
                msg: `El ID del parámetro: ${id_parametro} no existe `,
            });
        }
    } catch (error) {
        console.error('Error al obtener el parámetro:', error);
        res.status(500).json({ error: 'Error al obtener el parámetro' });
    }
};

// Inserta un parametro en la base de datos
export const postParametro = async (req: Request, res: Response) => {
    const { parametro, valor, fecha_creacion, fecha_modificacion, creado_por, modificado_por } = req.body;

    try {
        const _parametro = await Parametros.findOne({
            where: { parametro: parametro },
        });

        if (_parametro) {
            return res.status(400).json({
                msg: 'Parametro ya registrado en la base de datos: ' + parametro,
            });
        } else {
            await Parametros.create({
                parametro: parametro,
                valor: valor,
                fecha_creacion: fecha_creacion,
                fecha_modificacion: fecha_modificacion,
                creado_por: creado_por,
                modificado_por: modificado_por,
            });
            res.json({
                msg: 'El Parametro: ' + parametro + ' ha sido creada exitosamente',
            });
        }
    } catch (error) {
        console.error('Error al crear el parámetro:', error);
        res.status(500).json({
            msg: 'Hubo un error al crear el parámetro',
            error,
        });
    }
};

// Elimina un parametro de la base de datos
export const deleteParametro = async (req: Request, res: Response) => {
    const { id_parametro } = req.body;

    try {
        const _parametro = await Parametros.findOne({
            where: { id_parametro: id_parametro },
        });

        if (_parametro) {
            await _parametro.destroy();
            res.json({
                msg: 'El parámetro con el ID: ' + id_parametro + ' ha sido eliminado exitosamente',
            });
        } else {
            res.status(404).json({
                msg: 'No se encontró un parámetro con el ID: ' + id_parametro,
            });
        }
    } catch (error) {
        console.error('Error al eliminar el parámetro:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el parámetro',
        });
    }
};

// Actualiza la pregunta de la base de datos
export const updateParametro = async (req: Request, res: Response) => {
    const { id_parametro, parametro, valor, fecha_modificacion, modificado_por } = req.body;

    try {
        const _parametro = await Parametros.findOne({
            where: { id_parametro: id_parametro },
        });

        if (!_parametro) {
            return res.status(404).json({
                msg: 'Parametro con el ID: ' + id_parametro + ' no existe en la base de datos',
            });
        }

        await _parametro.update({
            id_parametro: id_parametro,
            parametro: parametro,
            valor: valor,
            fecha_modificacion: fecha_modificacion,
            modificado_por: modificado_por,
        });
        res.json({
            msg: 'El parametro con el ID: ' + id_parametro + ' ha sido actualizada exitosamente',
        });
    } catch (error) {
        console.error('Error al actualizar el parámetro:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el parámetro',
        });
    }
};
