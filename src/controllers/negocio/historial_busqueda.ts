import {Request, Response} from 'express';
import { Historial_Busqueda } from '../../models/negocio/historial_busqueda';


//Consulta todos los registros del historial de búsqueda
export const getAllHistorialB = async (req: Request, res: Response) => {
    try {
        const HistB = await Historial_Busqueda.findAll();
        res.json(HistB)
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}
//Consulta todos los registros del historial de búsqueda para una PYME por el id_pyme
export const gethistorial_busqueda_PYME = async (req: Request, res: Response) => {
    const { id_pyme } = req.params;
    try {
        const HistB = await Historial_Busqueda.findAll({
            where: {id_pyme: id_pyme}
        });
        res.json(HistB)
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}

//Inserta una nuevo registro en la Base de Datos
export const postHistorialB = async (req: Request, res: Response) => {

    const {  id_pyme, id_producto, id_pais, id_empresa, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado} = req.body;
    try{
        const HistB = await Historial_Busqueda.create({
            id_pyme: id_pyme,
            id_producto: id_producto,
            id_pais: id_pais,
            id_empresa: id_empresa,
            descripcion: descripcion.toUpperCase(),
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: Date.now(),
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: Date.now(),
            estado: estado
        })
        return res.json(HistB);
    }
    catch (error) {
        console.error('Error contacte al administrador:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}