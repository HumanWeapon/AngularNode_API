import {Request, Response} from 'express';
import { Permisos } from '../models/permisos-models';
import { Roles } from '../models/roles-models';
import { Objetos } from '../models/objetos-models';
import { Sequelize } from 'sequelize';
import db from '../db/connection';

//Obtiene todos los permisos de la base de datos
export const getAllPermisos = async (req: Request, res: Response) => {
    try {
        const _permisos = await Permisos.findAll();
        res.json(_permisos)
    } catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error interno, contacta al administrador.',
            error
        });
    }


}

//Obtiene un permiso de la base de datos
export const getPermiso = async (req: Request, res: Response) => {
    const { id_permisos } = req.body;
try {
    const _permiso = await Permisos.findOne({
        where: {id_permisos: id_permisos}
    });
    if(_permiso){
        res.json({_permiso})
    }
    else{
        res.status(404).json({
            msg: `el Id del permiso no existe: ${id_permisos}`
        })
    }
} catch (error) {
    res.status(400).json({
        msg: 'Contactate con el administrador',
        error
    }); 
}
}

//Inserta un nuevo permiso 
export const postPermiso = async (req: Request, res: Response) => {
    try {
        const {
            id_rol,
            id_objeto,
            permiso_insercion,
            permiso_eliminacion,
            permiso_actualizacion,
            permiso_consultar,
            creado_por,
            fecha_creacion,
            modificado_por,
            fecha_modificacion,
            estado_permiso
        } = req.body;

        // Crea el nuevo permiso
        const newPermiso = await Permisos.create({
            id_rol: id_rol,
            id_objeto: id_objeto,
            permiso_insercion: permiso_insercion,
            permiso_eliminacion: permiso_eliminacion,
            permiso_actualizacion: permiso_actualizacion,
            permiso_consultar: permiso_consultar,
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion,
            estado_permiso: estado_permiso
        });

        return res.json(newPermiso);
    } catch (error) {
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno, contacta al administrador.',
            error: error // Devuelve el mensaje de error para una mejor depuración
        });
    }
};


//Elimina un permiso de la base de datos
export const deletePermiso = async (req: Request, res: Response) => {
    const { id_permisos } = req.body;

    try {
        const _permisos = await Permisos.findOne({
            where: { id_permisos: id_permisos }
        });

        if (_permisos) {
            await _permisos.destroy();
            res.json(_permisos);
        } else {
            res.status(404).json({
                msg: 'No se encontró ningun permiso con esa numeracion',
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error interno, contacta al administrador.',
            error
        });
    }
};


//actualiza el permiso en la base de datos
export const updatePermisos = async (req: Request, res: Response) => {
   
        const { id_permisos, estado_permiso, id_rol, id_objeto, permiso_insercion, permiso_eliminacion, permiso_actualizacion, permiso_consultar, modificado_por, fecha_modificacion  } = req.body;
        try {
    const _permiso = await Permisos.findOne({
        where: {id_permisos: id_permisos}
    });
    if(!_permiso){
        return res.status(404).json({
            msg: 'El permiso seleccionado no existe en la base de datos'
        });
    }

    await _permiso.update({
        id_permisos: id_permisos,
        id_rol: id_rol,
        id_objeto: id_objeto, 
        permiso_insercion: permiso_insercion,
        permiso_eliminacion: permiso_eliminacion,
        permiso_actualizacion: permiso_actualizacion,
        permiso_consultar: permiso_consultar,        
        modificado_por: modificado_por.toUpperCase(),
        fecha_modificacion: fecha_modificacion,
        estado_permiso: estado_permiso
    });
    res.json(_permiso);
    } catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error interno, contacta al administrador.',
            error
        });
    }
    
}

//Inactiva el usuario de la DBA
export const inactivatePermiso = async (req: Request, res: Response) => {
   
        const { id_permisos } = req.body;
        try {
        const _permiso = await Permisos.findOne({
            where: {id_permisos: id_permisos}
        });
        if(!_permiso){
            return res.status(404).json({
                msg: "El Permiso no existe: "+ id_permisos
            });
        }
        await _permiso.update({
            estado_permiso: 2
        });
        res.json(_permiso);
    } catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error interno, contacta al administrador.',
            error
        });
    }

}

//Activa el usuario de la DBA
export const activatePermiso = async (req: Request, res: Response) => {
   
        const { id_permisos } = req.body;
        try {
        const _permiso= await Permisos.findOne({
            where: {id_permisos: id_permisos}
        });
        if(!_permiso){
            return res.status(404).json({
                msg: "El Permiso no existe: "+ id_permisos
            });
        }
    
        await _permiso.update({
            estado_permiso: 1
        });
        res.json(_permiso);
    } catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error interno, contacta al administrador.',
            error
        });
    }

}

//Activa el usuario de la DBA
export const permisosRolesObjetos = async (req: Request, res: Response) => {
    const { id_rol, tipo_objeto } = req.body; // Suponiendo que aquí recibes el id_rol del usuario logeado

    try {
        const _permiso = await Permisos.findAll({
            where: { id_rol: id_rol, estado_permiso: 1 }, // Filtrar por el id_rol del usuario logeado
            include: [              
                {
                    model: Objetos,
                    as: 'objetos',
                    where: { estado_objeto: 1, tipo_objeto: 'MENU_SIDEBAR' }
                }
            ],
            order: [
                [
                    Sequelize.literal(`CASE 
                        WHEN "objetos"."id_objeto" = 25 THEN 1 
                        WHEN "objetos"."id_objeto" = 23 THEN 2 
                        WHEN "objetos"."id_objeto" = 22 THEN 3 
                        WHEN "objetos"."id_objeto" = 9 THEN 4 
                        WHEN "objetos"."id_objeto" = 26 THEN 5 
                        WHEN "objetos"."id_objeto" = 7 THEN 6 
                        WHEN "objetos"."id_objeto" = 29 THEN 7 
                        ELSE 8 
                        END`)
                ]
            ],
        });
    
        res.json(_permiso);
    } catch (error) {
        console.error('Error al obtener parámetros de permisos:', error);
        res.status(500).json({ error: 'Error al obtener parámetros de permisos' });
    }
}


export const objetosSinRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const query = `
        SELECT
             OBJETOS.id_objeto
            ,OBJETOS.objeto
            ,OBJETOS.tipo_objeto
            ,(OBJETOS.tipo_objeto||' | '||OBJETOS.objeto)AS NOMBRE_OBJETO
            ,PERMISOS.id_permisos
            ,ROLES.id_rol
            ,ROLES.rol
        FROM mipyme.tbl_ms_objetos AS OBJETOS
        LEFT JOIN 
            (
                SELECT * FROM mipyme.tbl_ms_permisos
                WHERE estado_permiso = 1
                    AND id_rol = ${id}
            ) AS PERMISOS
        ON OBJETOS.id_objeto = PERMISOS.id_objeto
        LEFT JOIN 
            (
                SELECT * 
                FROM mipyme.tbl_ms_roles
                WHERE estado_rol = 1
            ) AS ROLES
        ON PERMISOS.id_rol = ROLES.id_rol
        WHERE OBJETOS.estado_objeto = 1
            AND PERMISOS.id_permisos IS NULL
        ORDER BY OBJETO = 'BUSCAR PRODUCTOS' DESC, OBJETO = 'DASHBOARD' DESC, OBJETO = 'PYMES' DESC, 
            OBJETO = 'EMPRESAS' DESC, OBJETO = 'SEGURIDAD' DESC, OBJETO = 'ADMINISTRACION' DESC, OBJETO = 'MANTENIMIENTO' DESC,
            tipo_objeto ASC
        `;

        const [results, metadata] = await db.query(query);

        res.json(results);
    } catch (error) {
        console.error('Error al consultar contactos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};