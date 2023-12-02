import { Bitacora } from "../models/bitacora-model";
import {Request, Response} from 'express';

//Obtiene todos los objetos de la base de datos
export const getAllBitacora = async (req: Request, res: Response) => {
    const bitacora = await Bitacora.findAll();
    res.json(bitacora)
}

export const PostBitacora = async (req: Request, res: Response) => {

    const { fecha, id_usuario, id_objeto, accion, descripcion } = req.body;

    try{
        await Bitacora.create({
            fecha: fecha,
            id_usuario: id_usuario, 
            id_objeto: id_objeto,
            accion: accion,
            descripcion: descripcion
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