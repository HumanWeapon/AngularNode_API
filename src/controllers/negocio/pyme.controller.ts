import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { Pyme } from '../../models/negocio/pyme-models';
import jwt from 'jsonwebtoken';
import { tipoEmpresa } from '../../models/negocio/tipoEmpresa-models';
import db from '../../db/connection';

export const loginPyme = async (req: Request, res: Response) => {
    const { nombre_pyme, rtn } = req.body;

    try {
        // Busca el usuario en la base de datos
        const pyme: any = await Pyme.findOne({
            where: { nombre_pyme: nombre_pyme }
        });

        if (!pyme) {
            return res.status(400).json({
                msg: 'Pyme/RTN inválidos.'
            });
        }

        // Compara la contraseña proporcionada con la contraseña almacenada en forma de hash
        const passwordValid = await bcrypt.compare(rtn, pyme.passwordHash);

        if (!passwordValid) {
            // Si la contraseña es incorrecta, aumenta el contador de intentos fallidos
            pyme.intentos_fallidos = (pyme.intentos_fallidos || 0) + 1;
            await pyme.save();

            if (pyme.intentos_fallidos >= 3) {
                // Si el usuario ha alcanzado 3 intentos fallidos, bloquea el usuario
                pyme.estado = 3;
                await pyme.save();
            }

            return res.status(400).json({
                msg: 'Pyme/RTN inválidos.',
                requestData: req.body  // Agregar más información si es necesario
              });
              
        }else{
            // Si el inicio de sesión es exitoso, restablece los intentos fallidos
            pyme.intentos_fallidos = 0;
            await pyme.save();
        }

        if(pyme.fecha_ultima_conexion == null){
            return res.json(pyme.fecha_ultima_conexion);
        }

        // Validar estado del usuario
        if (pyme.estado != 1) {
            return res.status(400).json({
                msg: 'Pyme Inactiva',
            });
        }
        // Genera el token
        const token = jwt.sign({
            pyme: pyme
        }, process.env.SECRET_KEY || 'Lamers005*');
            
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
                error: 'Error desconocido' // Otra manejo de errores si no es una instancia de Error
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
    const { id_pyme } = req.body;
try {
    const _pyme = await Pyme.findOne({
        where: {id_pyme: id_pyme}
    });
    if(_pyme){
        res.json(_pyme)
    }
    else{
        res.status(404).json({
            msg: `el ID de la pregunta no existe: ${id_pyme}`
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

    const { nombre_pyme, rtn, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado, id_rol}  = req.body;

    try{
        const _pyme = await Pyme.findOne({
            where: {nombre_pyme: nombre_pyme}
        })
    
            const newPyme = await Pyme.create({
                nombre_pyme: nombre_pyme.toUpperCase(),
                rtn: rtn,
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: Date.now(),
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: Date.now(),
                estado: estado,
                id_rol: id_rol
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
    const { id_pyme, nombre_pyme, id_tipo_empresa, categoria, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

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
        id_tipo_empresa:id_tipo_empresa,
        categoria: categoria.toUpperCase(),
        descripcion: descripcion.toUpperCase(),
        creado_por: creado_por.toUpperCase(),
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por.toUpperCase(),
        fecha_modificacion: fecha_modificacion,
        estado: estado
        
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