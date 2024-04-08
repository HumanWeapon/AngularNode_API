import {Request, Response} from 'express';
import { Historial_Busqueda } from '../../models/negocio/historial_busqueda';
import db from '../../db/connection'
import { QueryTypes } from 'sequelize';


//Consulta todos los registros del historial de búsqueda
export const getAllHistorialB = async (req: Request, res: Response) => {
    try {
        const query = `
        SELECT 
            HISTORIAL.id_historial,
            HISTORIAL.id_pyme,
            PYME.nombre_pyme,
            HISTORIAL.id_producto,
            PRODUCTO.producto,
            HISTORIAL.id_pais,
            PAIS.pais,
            HISTORIAL.id_empresa,
            EMPRESA.nombre_empresa,
            HISTORIAL.fecha_creacion
        FROM mipyme.tbl_me_historial_busqueda HISTORIAL
        LEFT JOIN mipyme.tbl_me_pyme PYME ON HISTORIAL.id_pyme = PYME.id_pyme
        LEFT JOIN mipyme.tbl_me_productos PRODUCTO ON HISTORIAL.id_producto = PRODUCTO.id_producto
        LEFT JOIN mipyme.tbl_me_paises PAIS ON HISTORIAL.id_pais = PAIS.id_pais
        LEFT JOIN mipyme.tbl_me_empresas EMPRESA ON HISTORIAL.id_empresa = EMPRESA.id_empresa
        ORDER BY id_historial DESC
        `;
        const [results, metadata] = await db.query(query);
        res.json(results);
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
        const query = `
        SELECT 
            HISTORIAL.id_historial,
            HISTORIAL.id_pyme,
            PYME.nombre_pyme,
            HISTORIAL.id_producto,
            PRODUCTO.producto,
            HISTORIAL.id_pais,
            PAIS.pais,
            HISTORIAL.id_empresa,
            EMPRESA.nombre_empresa,
            HISTORIAL.fecha_creacion
        FROM mipyme.tbl_me_historial_busqueda HISTORIAL
        LEFT JOIN mipyme.tbl_me_pyme PYME ON HISTORIAL.id_pyme = PYME.id_pyme
        LEFT JOIN mipyme.tbl_me_productos PRODUCTO ON HISTORIAL.id_producto = PRODUCTO.id_producto
        LEFT JOIN mipyme.tbl_me_paises PAIS ON HISTORIAL.id_pais = PAIS.id_pais
        LEFT JOIN mipyme.tbl_me_empresas EMPRESA ON HISTORIAL.id_empresa = EMPRESA.id_empresa
        WHERE HISTORIAL.id_pyme = ?
        ORDER BY id_historial DESC
        `;
        const results = await db.query(query, {
            replacements: [id_pyme],
            type: QueryTypes.SELECT
        });
        if (results.length === 0) {
            return res.status(404).json({ msg: 'No hay registro de búsquedas de producto' });
        }
        res.json(results);
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
//Consulta el top 10 de productos más buscados
export const getTop10Busquedas = async (req: Request, res: Response) => {
    try {
        const query = `
        SELECT 
            PRODUCTO.producto AS "name",
            COUNT(HISTORIAL.id_historial) AS "value"
        FROM mipyme.tbl_me_historial_busqueda HISTORIAL
        LEFT JOIN mipyme.tbl_me_productos PRODUCTO ON HISTORIAL.id_producto = PRODUCTO.id_producto
        GROUP BY PRODUCTO.producto
        ORDER BY "value" DESC
        LIMIT 10
        `;
        const [results, metadata] = await db.query(query);
        res.json(results);
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}