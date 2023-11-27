import { Request, Response } from 'express';
import { Preguntas } from '../models/preguntas-model';
import jwt from 'jsonwebtoken';

// Obtiene todas las preguntas de la base de datos
export const getAllPreguntas = async (req: Request, res: Response) => {
    try {
        const _pregunta = await Preguntas.findAll();
        res.json(_pregunta);
    } catch (error) {
        console.error('Error al obtener todas las preguntas de la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Obtiene una pregunta de la base de datos
export const getPregunta = async (req: Request, res: Response) => {
    try {
        const { id_pregunta } = req.body;
        const _pregunta = await Preguntas.findOne({
            where: { id_pregunta: id_pregunta }
        });

        if (_pregunta) {
            res.json(_pregunta);
        } else {
            res.status(404).json({
                msg: `El ID de la pregunta no existe: ${id_pregunta}`
            });
        }
    } catch (error) {
        console.error('Error al obtener una pregunta de la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Inserta una pregunta en la base de datos
export const postPregunta = async (req: Request, res: Response) => {
    try {
        const {
            pregunta,
            creado_por,
            fecha_creacion,
            modificado_por,
            fecha_modificacion
        } = req.body;

        const _Pregunta = await Preguntas.findOne({
            where: { pregunta: pregunta }
        });

        if (_Pregunta) {
            return res.status(400).json({
                msg: 'Pregunta ya registrada en la base de datos: ' + pregunta
            });
        } else {
            await Preguntas.create({
                pregunta: pregunta,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion
            });

            res.json({
                msg: 'La pregunta: ' + pregunta + ' ha sido creada exitosamente',
            });
        }
    } catch (error) {
        console.error('Error al insertar una pregunta en la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Elimina la pregunta de la base de datos
export const deletePregunta = async (req: Request, res: Response) => {
    try {
        const { id_pregunta } = req.body;

        const _pregunta = await Preguntas.findOne({
            where: { id_pregunta: id_pregunta }
        });

        if (!_pregunta) {
            return res.status(404).json({
                msg: 'Pregunta con el ID: ' + id_pregunta + ' no existe en la base de datos'
            });
        }

        await _pregunta.destroy();
        res.json({
            msg: 'La pregunta con el ID: ' + id_pregunta + ' ha sido eliminada exitosamente',
        });
    } catch (error) {
        console.error('Error al eliminar una pregunta de la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Actualiza la pregunta de la base de datos
export const updatePregunta = async (req: Request, res: Response) => {
    try {
        const { id_pregunta, pregunta, modificado_por, fecha_modificacion } = req.body;

        const _pregunta = await Preguntas.findOne({
            where: { id_pregunta: id_pregunta }
        });

        if (!_pregunta) {
            return res.status(404).json({
                msg: 'Pregunta con el ID: ' + id_pregunta + ' no existe en la base de datos'
            });
        }

        await _pregunta.update({
            id_pregunta: id_pregunta,
            pregunta: pregunta,
            modificado_por: modificado_por,
            fecha_modificacion: fecha_modificacion
        });

        res.json({
            msg: 'La pregunta con el ID: ' + id_pregunta + ' ha sido actualizada exitosamente',
        });
    } catch (error) {
        console.error('Error al actualizar una pregunta de la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}
