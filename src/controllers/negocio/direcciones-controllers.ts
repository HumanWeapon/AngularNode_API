import {Request, Response} from 'express';
import { Direcciones } from '../../models/negocio/direccionesContacto-model';

//Obtiene todas las Empresas
export const getdirecciones = async (req: Request, res: Response) => {
    try {
        const _direcontactos = await Direcciones.findAll();
        res.json(_direcontactos)
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}