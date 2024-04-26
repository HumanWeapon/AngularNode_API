import { Bitacora } from "../models/bitacora-model";
import {Request, Response} from 'express';
import { User } from "../models/usuario-models";
import { Objetos } from "../models/objetos-models";

//Obtiene todos los objetos de la tabla bitácora
export const getAllBitacora = async (req: Request, res: Response) => {
    try {
        const bitacora = await Bitacora.findAll({
            attributes: ['id_bitacora', 'fecha', 'id_usuario', 'id_objeto', 'campo_original', 'nuevo_campo', 'accion', ],
            include: [
                {
                    model: User,
                    attributes: ['usuario', 'nombre_usuario'] 
                },
                {
                    model: Objetos,
                    attributes: ['objeto']
                }
            ],
            order: [['id_bitacora', 'DESC']] // Ordenar por fecha ascendente
        });
        res.json(bitacora);
    } catch (error) {
        console.error('Error al obtener la bitácora:', error);
        res.status(500).json({ error: 'Error al obtener la bitácora' }); 
    }
}

export const PostBitacora = async (req: Request, res: Response) => {
    const { id_bitacora, fecha, id_usuario, id_objeto, accion, campo_original, nuevo_campo } = req.body;

    try {
        // Ordena los registros por fecha de forma ascendente
        const bitacora = await Bitacora.create({
            id_bitacora,
            fecha: fecha,
            id_usuario: id_usuario,
            id_objeto: id_objeto,
            campo_original: campo_original.toUpperCase(),
            nuevo_campo: nuevo_campo.toUpperCase(),
            accion: accion.toUpperCase(),
        }, { order: [['id_bitacora', 'DESC']] });

        res.json({
            msg: 'El evento se ha registrado exitosamente',
            bitacora: bitacora // Si deseas devolver el registro creado en la respuesta
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
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
        res.status(400).json({
            msg: 'Contacta al administrador',
            error
        });
    }
}