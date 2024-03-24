import {Request, Response} from 'express';
import db from '../../db/connection';

//Obtiene las direcciones
export const getdirecciones = async (req: Request, res: Response) => {
    try {
        const query = `
        SELECT 
            DIRECCIONES.id_direccion,
            DIRECCIONES.direccion,
            DIRECCIONES.id_tipo_direccion,
            TIPO_DIRECCION.tipo_direccion,
            DIRECCIONES.id_ciudad,
            CIUDAD.ciudad,
            DIRECCIONES.id_pais, 
            PAIS.pais,
            DIRECCIONES.id_empresa,
            EMPRESA.nombre_empresa,
            DIRECCIONES.descripcion,
            DIRECCIONES.creado_por,
            DIRECCIONES.fecha_creacion,
            DIRECCIONES.modificado_por,
            DIRECCIONES.fecha_modificacion,
            DIRECCIONES.estado
        FROM mipyme.tbl_me_direcciones AS DIRECCIONES
        LEFT JOIN 
            (
                SELECT id_ciudad, ciudad
                FROM mipyme.tbl_me_ciudades
            ) AS CIUDAD
        ON DIRECCIONES.id_ciudad = CIUDAD.id_ciudad
        LEFT JOIN 
            (
                SELECT id_pais , pais
                FROM mipyme.tbl_me_paises
            ) AS PAIS
        ON DIRECCIONES.id_pais = PAIS.id_pais
        LEFT JOIN 
            (
                SELECT id_tipo_direccion, tipo_direccion 
                FROM mipyme.tbl_me_tipo_direccion
                WHERE estado = 1
            ) AS TIPO_DIRECCION
        ON DIRECCIONES.id_tipo_direccion = TIPO_DIRECCION.id_tipo_direccion
        LEFT JOIN 
            (
                SELECT id_empresa, nombre_empresa
                FROM mipyme.tbl_me_empresas
            ) AS EMPRESA
        ON DIRECCIONES.id_empresa = EMPRESA.id_empresa
        `;
        const [results, metadata] = await db.query(query);
        res.json(results);
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}
//Obtiene todos los tipo de dirección activos
export const getTipoDirecciones = async (req: Request, res: Response) => {
    try {
        const query = `
        SELECT id_tipo_direccion, tipo_direccion 
		FROM mipyme.tbl_me_tipo_direccion
		WHERE estado = 1
        `;
        const [results, metadata] = await db.query(query);
        res.json(results);
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}
//Obtiene todas las ciudades activas
export const getCiudades = async (req: Request, res: Response) => {
    try {
        const query = `
        SELECT A.id_ciudad, (A.ciudad||' | '||B.pais) AS CIUDAD
        FROM mipyme.tbl_me_ciudades as A
        LEFT JOIN 
            (
                SELECT id_pais , pais
                FROM mipyme.tbl_me_paises
                WHERE estado = 1
            ) AS B
        ON A.id_pais = B.id_pais
        WHERE A.estado = 1
        `;
        const [results, metadata] = await db.query(query);
        res.json(results);
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}
//Obtiene las direcciones asociadas a la empresa por ID
export const getDireccionesEmpresaporID = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const query = `
        SELECT 
            DIRECCIONES.id_direccion,
            DIRECCIONES.direccion,
            DIRECCIONES.id_tipo_direccion,
            TIPO_DIRECCION.tipo_direccion,
            DIRECCIONES.id_ciudad,
            CIUDAD.ciudad,
            DIRECCIONES.id_pais, 
            PAIS.pais,
            DIRECCIONES.descripcion,
            DIRECCIONES.creado_por,
            DIRECCIONES.fecha_creacion,
            DIRECCIONES.modificado_por,
            DIRECCIONES.fecha_modificacion,
            DIRECCIONES.estado
        FROM mipyme.tbl_me_direcciones AS DIRECCIONES
        LEFT JOIN 
            (
                SELECT id_ciudad, ciudad
                FROM mipyme.tbl_me_ciudades
            ) AS CIUDAD
        ON DIRECCIONES.id_ciudad = CIUDAD.id_ciudad
        LEFT JOIN 
            (
                SELECT id_pais , pais
                FROM mipyme.tbl_me_paises
            ) AS PAIS
        ON DIRECCIONES.id_pais = PAIS.id_pais
        LEFT JOIN 
            (
                SELECT id_tipo_direccion, tipo_direccion 
                FROM mipyme.tbl_me_tipo_direccion
            ) AS TIPO_DIRECCION
        ON DIRECCIONES.id_tipo_direccion = TIPO_DIRECCION.id_tipo_direccion
        WHERE DIRECCIONES.id_empresa = ${id}
        `;
        const [results, metadata] = await db.query(query);
        res.json(results);
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}