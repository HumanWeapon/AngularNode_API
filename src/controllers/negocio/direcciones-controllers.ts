import {Request, Response} from 'express';
import db from '../../db/connection';

//Obtiene las direcciones
export const getdirecciones = async (req: Request, res: Response) => {
    try {
        const query = `
        SELECT 
            DIRECCIONES.id_direccion,
            DIRECCIONES.id_tipo_direccion,
            DIRECCIONES.direccion,
            TIPO.tipo_direccion,
            DIRECCIONES.id_ciudad,
            CIUDAD.ciudad,
            CIUDAD.id_pais,
            CIUDAD.pais,
            DIRECCIONES.descripcion,
            DIRECCIONES.creado_por,
            DIRECCIONES.fecha_creacion,
            DIRECCIONES.modificado_por,
            DIRECCIONES.fecha_modificacion,
            DIRECCIONES.estado
        FROM mipyme.tbl_me_direcciones AS DIRECCIONES
        LEFT JOIN 
            (
                SELECT A.id_ciudad, A.ciudad, A.id_pais, B.pais
                FROM mipyme.tbl_me_ciudades as A
                LEFT JOIN 
                    (
                        SELECT id_pais , pais
                        FROM mipyme.tbl_me_paises
                        WHERE estado = 1
                    ) AS B
                ON A.id_pais = B.id_pais
                WHERE A.estado = 1
            ) AS CIUDAD
        ON DIRECCIONES.id_ciudad = CIUDAD.id_ciudad
        LEFT JOIN 
            (
                SELECT id_tipo_direccion, tipo_direccion 
                FROM mipyme.tbl_me_tipo_direccion
                WHERE estado = 1
            ) AS TIPO
        ON DIRECCIONES.id_tipo_direccion = TIPO.id_tipo_direccion
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