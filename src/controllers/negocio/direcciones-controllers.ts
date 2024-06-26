import {Request, Response} from 'express';
import db from '../../db/connection';
import { Direcciones } from '../../models/negocio/direccionesContacto-model';
import { QueryTypes } from 'sequelize';

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
        SELECT A.id_ciudad, (B.pais||' | '||A.ciudad) AS CIUDAD
        FROM mipyme.tbl_me_ciudades as A
        LEFT JOIN 
            (
                SELECT id_pais , pais
                FROM mipyme.tbl_me_paises
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
//Obtiene las direcciones asociadas a la empresa por ID muestra activas e inactivas
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
//Obtiene las direcciones activas asociadas a la empresa por ID
export const getDireccionesEmpresaporActivasID = async (req: Request, res: Response) => {
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
            AND DIRECCIONES.estado = 1
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
//Inactiva la direccion de la DBA
export const inactivateDirecion = async (req: Request, res: Response) => {
   
    const { id_direccion } = req.body;
    try {
        const _direc = await Direcciones.findOne({
            where: {id_direccion: id_direccion}
        });
        if(!_direc){
            return res.status(404).json({
                msg: "Direccion no encontrada: id-"+ id_direccion
            });
        }

        await _direc.update({
            estado: 2
        });
        res.json(_direc);
    } catch (error) {
        console.error('Error al inactivar la direccion:', error);
        res.status(500).json({
            msg: 'Contactate con el administrador',
        });
    }
}

//Activa la direccion de la DBA
export const activateDireccion = async (req: Request, res: Response) => {
        
    const { id_direccion } = req.body;
    try {
        const _direc = await Direcciones.findOne({
            where: {id_direccion: id_direccion}
        });
    if(!_direc){
        return res.status(404).json({
            msg: "Direccion no encontrada: id-"+ id_direccion
        });
    }

    await _direc.update({
        estado: 1
    });
    res.json(_direc);

    } catch (error) {
        console.error('Error al activar la direccion:', error);
        res.status(500).json({
            msg: 'Contactate con el administrador',
        });
    }
}
// Inserta una nueva dirección en la DBA
export const postDireccion = async (req: Request, res: Response) => {
    const { direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado, id_tipo_direccion, id_empresa, id_pais, id_ciudad } = req.body;
    try {
        const query = `
            INSERT INTO mipyme.tbl_me_direcciones(
                direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado, id_tipo_direccion, id_empresa, id_pais, id_ciudad)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const results = await db.query(query, {
            replacements: [direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado, id_tipo_direccion, id_empresa, id_pais, id_ciudad],
            type: QueryTypes.INSERT
        });
        res.json(results);
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}
// Actualiza una dirección existente en la DBA por su ID
export const putDireccion = async (req: Request, res: Response) => {
    const id = req.params.id; // Obtener el ID de la dirección de los parámetros de la solicitud
    const { direccion, descripcion, modificado_por, fecha_modificacion, estado, id_tipo_direccion, id_empresa, id_pais, id_ciudad } = req.body;
    try {
        const query = `
            UPDATE mipyme.tbl_me_direcciones
            SET direccion = ?, descripcion = ?, modificado_por = ?, fecha_modificacion = ?, estado = ?, id_tipo_direccion = ?, id_empresa = ?, id_pais = ?, id_ciudad = ?
            WHERE id_direccion = ?;
        `;
        const results = await db.query(query, {
            replacements: [direccion, descripcion, modificado_por, fecha_modificacion, estado, id_tipo_direccion, id_empresa, id_pais, id_ciudad, id],
            type: QueryTypes.UPDATE
        });
        res.json(results);
    } catch (error) {
        res.status(400).json({
            msg: 'Error al actualizar la dirección',
            error
        }); 
    }
}