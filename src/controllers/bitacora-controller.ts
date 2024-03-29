import { Bitacora } from "../models/bitacora-model";
import {Request, Response} from 'express';
import { User } from "../models/usuario-models";
import { Objetos } from "../models/objetos-models";

//Obtiene todos los objetos de la tabla bitácora
export const getAllBitacora = async (req: Request, res: Response) => {
    try {
        const bitacora = await Bitacora.findAll({
            attributes: ['fecha', 'id_usuario', 'id_objeto', 'campo_original', 'nuevo_campo', 'accion', ],
            include: [
                {
                    model: User,
                    attributes: ['usuario', 'nombre_usuario']
                },
                {
                    model: Objetos,
                    attributes: ['objeto']
                }
            ]
        });
        res.json(bitacora);
    } catch (error) {
        console.error('Error al obtener la bitácora:', error);
        res.status(500).json({ error: 'Error al obtener la bitácora' });
    }
}

export const PostBitacora = async (req: Request, res: Response) => {

    const { fecha, id_usuario, id_objeto, accion, campo_original, nuevo_campo } = req.body;

    try{
        await Bitacora.create({
            fecha: fecha,
            id_usuario: id_usuario, 
            id_objeto: id_objeto,
            campo_original: campo_original.toUpperCase(),
            nuevo_campo: nuevo_campo.toUpperCase(),
            accion: accion.toUpperCase(),
        })
        res.json({
            msg: 'El evento se ha registrado exitosamente',
        })
    }
    catch (error){
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