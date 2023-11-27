import { Bitacora } from "../models/bitacora-model";
import { Request, Response } from 'express';

// Obtiene todos los objetos de la base de datos
export const getAllBitacora = async (req: Request, res: Response) => {
    try {
        const bitacora = await Bitacora.findAll();
        res.json(bitacora);
    } catch (error) {
        console.error('Error al obtener todos los registros de la bitácora:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

export const PostBitacora = async (req: Request, res: Response) => {
    try {
        const { fecha, id_usuario, id_objeto, accion, descripcion } = req.body;

        await Bitacora.create({
            fecha: fecha,
            id_usuario: id_usuario,
            id_objeto: id_objeto,
            accion: accion,
            descripcion: descripcion
        });

        res.json({
            msg: 'El evento se ha registrado exitosamente',
        });
    } catch (error) {
        console.error('Error al registrar un evento en la bitácora:', error);
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error,
        });
    }
}

export const DeleteBitacora = async (req: Request, res: Response) => {
    try {
        // Obtén todos los registros de la tabla "Bitacora"
        const bitacora = await Bitacora.findAll();

        // Itera sobre los registros y elimínalos uno por uno
        for (const registro of bitacora) {
            await registro.destroy();
        }

        res.json({
            msg: 'La bitácora ha sido limpiada exitosamente',
        });
    } catch (error) {
        console.error('Error al limpiar la bitácora:', error);
        res.status(400).json({
            msg: 'Contacta al administrador',
            error,
        });
    }
}
