import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { Pyme } from '../../models/negocio/pyme-models';
import jwt from 'jsonwebtoken';
import { tipoEmpresa } from '../../models/negocio/tipoEmpresa-models';

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
}

// Inserta una nueva Pyme en la base de datos
export const postPyme = async (req: Request, res: Response) => {

    const { nombre_pyme, id_tipo_empresa, categoria, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado} = req.body;

    try{
        const _pyme = await Pyme.findOne({
            where: {nombre_pyme: nombre_pyme}
        })
    
            await Pyme.create({
                id_tipo_empresa:id_tipo_empresa,
                nombre_pyme: nombre_pyme,
                categoria: categoria,
                descripcion: descripcion, 
                creado_por: creado_por,
                fecha_creacion: Date.now(),
                modificado_por: modificado_por,
                fecha_modificacion: Date.now(),
                estado: estado
            })
            res.json({
                msg: 'La Pyme: '+ nombre_pyme+  ' ha sido creada exitosamente',
            })
        
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
            res.json({
                msg: 'La Pyme con el ID: ' + id_pyme + ' ha sido eliminado exitosamente',
            });
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
        nombre_pyme: nombre_pyme,
        id_tipo_empresa:id_tipo_empresa,
        categoria: categoria,
        descripcion: descripcion, 
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
        
    });
    res.json({
        msg: 'La Pyme con el ID: '+ id_pyme+  ' ha sido actualizado exitosamente',
    });
}

//Inactiva el la pyme de la DBA
export const inactivatePyme = async (req: Request, res: Response) => {
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
    res.json({
        msg: 'Pyme: '+ nombre_pyme+  ' inactivado exitosamente',
    });
}

//Activa la pyme de la DBA
export const activatePyme = async (req: Request, res: Response) => {
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
    res.json({
        msg: 'Pyme: '+ nombre_pyme +  ' ha sido activado exitosamente',
    });
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
