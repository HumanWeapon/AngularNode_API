import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { Pyme } from '../../models/negocio/pyme-models';
import jwt from 'jsonwebtoken';
import { tipoEmpresa } from '../../models/negocio/tipoEmpresa-models';
import db from '../../db/connection';
import { QueryTypes } from 'sequelize';

export const loginPyme = async (req: Request, res: Response) => {
    const { nombre_pyme, rtn } = req.body;

    try {
        // Busca la pyme en la base de datos
        const pyme: any = await Pyme.findOne({
            where: { nombre_pyme: nombre_pyme }
        });

        if (!pyme) {
            return res.status(400).json({
                msg: 'Pyme no encontrada.'
            });
        }

        // Compara el RTN proporcionado con el almacenado en la base de datos
        if (pyme.rtn !== rtn) {
            return res.status(400).json({
                msg: 'RTN inválido.',
                requestData: req.body 
            });
        }

        // Si el RTN coincide, verifica el estado de la pyme
        if (pyme.estado !== 1) {
            return res.status(400).json({
                msg: 'Pyme inactiva.'
            });
        }

        // Genera el token de autenticación
        const token = jwt.sign({
            pyme: pyme
        }, process.env.SECERT_KEY_PYME || 'Lamers006*');
            
        res.json(token);
    } catch (error) {
        console.error('Error en loginPyme:', error);
        if (error instanceof Error) {
            res.status(500).json({
                msg: 'Error en el servidor',
                error: error.message
            });
        } else {
            res.status(500).json({
                msg: 'Error en el servidor',
                error: 'Error desconocido'
            });
        }
    }
}

//Obtiene todas las Pymes
export const getAllPymes = async (req: Request, res: Response) => {
    const pyme = await Pyme.findAll();
    res.json(pyme)
}

//Obtiene una Pyme por ID
export const getPyme = async (req: Request, res: Response) => {
try {
    const { nombre_pyme } = req.body;
    const _pyme = await Pyme.findOne({
        where: {nombre_pyme: nombre_pyme}
    });
    if(_pyme){
        res.json(_pyme)
    }
    else{
        res.status(404).json({
            msg: `No Existe La Pyme: ${nombre_pyme}`
        })
    }

} catch (error) {
    res.status(400).json({
        msg: 'Contactate con el administrador',
        error
    }); 
}
}

// Inserta una nueva Pyme en la base de datos
export const postPyme = async (req: Request, res: Response) => {

    const { nombre_pyme, rtn,  creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado, fecha_ultima_conexion, id_rol, nombre_contacto, correo_contacto, telefono_contacto}  = req.body;

    try{
        const _pyme = await Pyme.findOne({
            where: {nombre_pyme: nombre_pyme}
        })
    
            const newPyme = await Pyme.create({
                nombre_pyme: nombre_pyme.toUpperCase(),
                rtn: rtn,
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: Date.now(),
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: Date.now(),
                estado: estado,
                fecha_ultima_conexion: Date.now(),
                id_rol: id_rol,
                nombre_contacto: nombre_contacto.toUpperCase(),
                correo_contacto: correo_contacto.toUpperCase(),
                telefono_contacto: telefono_contacto
            })
            res.json(newPyme)
        
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}

// Elimina la Pyme de la base de datos
export const deletePyme = async (req: Request, res: Response) => {
    const { id_pyme } = req.body; // Obtén el ID desde los parámetros de la URL

    try {
        const _pyme = await Pyme.findOne({
            where: { id_pyme: id_pyme}
        });

        if (_pyme) {
            await _pyme.destroy();
            res.json(_pyme);
        } else {
            res.status(404).json({
                msg: 'No se encontró una Pyme con el ID ' + id_pyme,
            });
        }
    } catch (error) {
        console.error('Error al eliminar la Pyme:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la Pyme',
        });
    }
};

//actualiza el Telefono en la base de datos
export const updatePyme = async (req: Request, res: Response) => {

    try{
    const { id_pyme, nombre_pyme, rtn,  creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado, fecha_ultima_conexion, nombre_contacto, correo_contacto, telefono_contacto } = req.body;

    const _pyme = await Pyme.findOne({
        where: {id_pyme: id_pyme}
    });
    if(!_pyme){
        return res.status(404).json({
            msg: 'Pyme con el ID: '+ id_pyme +' no existe en la base de datos'
        });
    }

    await _pyme.update({

        id_pyme:id_pyme,
        nombre_pyme: nombre_pyme.toUpperCase(),
        rtn: rtn,
        creado_por: creado_por.toUpperCase(),
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por.toUpperCase(),
        fecha_modificacion: fecha_modificacion,
        estado: estado,
        fecha_ultima_conexion: fecha_ultima_conexion,
        nombre_contacto: nombre_contacto.toUpperCase(),
        correo_contacto: correo_contacto.toUpperCase(),
        telefono_contacto: telefono_contacto
        
        
    });
    res.json(_pyme);

} catch (error) {
    console.error('Error al actualizar la pyme:', error);
    res.status(500).json({
        msg: 'Hubo un error al actualizar la pyme',
    });
}
}

//Inactiva el la pyme de la DBA
export const inactivatePyme = async (req: Request, res: Response) => {
    try {
    const { nombre_pyme } = req.body;

    const _pymes = await Pyme.findOne({
        where: {nombre_pyme: nombre_pyme}
    });
    if(!_pymes){
        return res.status(404).json({
            msg: "La Pyme no existe: "+ nombre_pyme
        });
    }

    await _pymes.update({
        estado: 2
    });
    res.json(_pymes);

} catch (error) {
    console.error('Error al inactivar la pyme:', error);
    res.status(500).json({
        msg: 'Hubo un error al inactivar la pyme',
    });
}
}

//Activa la pyme de la DBA
export const activatePyme = async (req: Request, res: Response) => {
    try {
    const { nombre_pyme } = req.body;

    const _pyme = await Pyme.findOne({
        where: {nombre_pyme: nombre_pyme}
    });
    if(!_pyme){
        return res.status(404).json({
            msg: "La Pyme no existe: "+ nombre_pyme
        });
    }

    await _pyme.update({
        estado: 1
    });
    res.json(_pyme);

} catch (error) {
    console.error('Error al activar la pyme:', error);
    res.status(500).json({
        msg: 'Hubo un error al activar la pyme',
    });
}
}

    export const pymesAllTipoEmpresa = async (req: Request, res: Response) => {
        try {
            const pyme = await Pyme.findAll({
                include: [
                    {
                        model: tipoEmpresa,
                        as: 'tipoEmpresa' // Usa el mismo alias que en la definición de la asociación
                    },
                ],
            });
            
            res.json(pyme);
        } catch (error) {
            console.error('Error al obtener preguntas de usuario:', error);
            res.status(500).json({ error: 'Error al obtener preguntas de usuario' });
        }
    }
//Obtiene el id del rol PYME
export const getRolPyme = async (req: Request, res: Response) => {
    try {
        const query = `
        SELECT id_rol, rol FROM mipyme.tbl_ms_roles
        WHERE ROL = 'PYME'
        `;
        const [results, metadata] = await db.query(query);
        res.json(results[0]);
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}
// Obtiene una  pyme por el nombre de la pyme
export const getOnePyme = async (req: Request, res: Response) => {
    const id = req.params.id; // Obtener el ID de la dirección de los parámetros de la solicitud
    try {
        const query = `
            SELECT *
            FROM mipyme.tbl_me_pyme
            WHERE nombre_pyme = ?
        `;
        const results = await db.query(query, {
            replacements: [id],
            type: QueryTypes.SELECT
        });
        if (results.length === 0) {
            return res.status(404).json({ msg: 'No se encontró ninguna PYME con ese nombre' });
        }
        res.json(results[0]); // Devuelve solo el primer resultado
    } catch (error) {
        console.error('Error al obtener la PYME:', error);
        res.status(500).json({ msg: 'Error al obtener la PYME' });
    }
}