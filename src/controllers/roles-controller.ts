import { Request, Response } from 'express';
import { Roles } from '../models/roles-models';
import jwt from 'jsonwebtoken';

// Obtiene todos los roles de la base de datos
export const getAllRoles = async (req: Request, res: Response) => {
<<<<<<< HEAD

    const _roles = await Roles.findAll();
    res.json(_roles)

}

//Obtiene un rol de la base de datos
export const getRol = async (req: Request, res: Response) => {
    const { id_rol } = req.body;

    const _rol = await Roles.findOne({
        where: {id_rol: id_rol}
    });
    if(_rol){
        res.json({_rol})
    }
    else{
        res.status(404).json({
            msg: `el Id del rol no existe: ${id_rol}`
        })
    }
}

//Inserta un rol en la base de datos
export const postRol = async (req: Request, res: Response) => {

    const { rol, descripcion, estado_rol, creado_por, fecha_creacion, modificado_por, fecha_modificacion  } = req.body;

    try{
        const _Rol = await Roles.findOne({
            where: {rol: rol}
        })
    
        if (_Rol){
            return res.status(400).json({
                msg: 'Rol ya registrado en la base de datos: '+ rol
            })
        }else{
            await Roles.create({
                rol: rol,
                descripcion: descripcion, 
                estado_rol: estado_rol,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion
                
            })
            res.json({
                msg: 'El Rol: '+ rol+  ' ha sido creada exitosamente',
            })
        }
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
    /*// Generamos token
    const token = jwt.sign({
        usuario: usuario
    }, process.env.SECRET_KEY || 'Lamers005*');
    res.json(token);*/
}

//Elimina un rol de la base de datos
export const deleteRol = async (req: Request, res: Response) => {
    const { id_rol } = req.body;

=======
>>>>>>> 1fe3a974d7a1e20dd4e417e08d774c89ca7880ec
    try {
        const _roles = await Roles.findAll();
        res.json(_roles);
    } catch (error) {
        console.error('Error al obtener todos los roles de la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Obtiene un rol de la base de datos
export const getRol = async (req: Request, res: Response) => {
    try {
        const { id_rol } = req.body;
        const _rol = await Roles.findOne({
            where: { id_rol: id_rol }
        });

        if (_rol) {
            res.json({ _rol });
        } else {
            res.status(404).json({
                msg: `El ID del rol no existe: ${id_rol}`
            });
        }
    } catch (error) {
        console.error('Error al obtener un rol de la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Inserta un rol en la base de datos
export const postRol = async (req: Request, res: Response) => {
    try {
        const {
            rol,
            descripcion,
            creado_por,
            fecha_creacion,
            modificado_por,
            fecha_modificacion
        } = req.body;

        const _Rol = await Roles.findOne({
            where: { rol: rol }
        });

        if (_Rol) {
            return res.status(400).json({
                msg: 'Rol ya registrado en la base de datos: ' + rol
            });
        } else {
            await Roles.create({
                rol: rol,
                descripcion: descripcion,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion
            });

            res.json({
                msg: 'El Rol: ' + rol + ' ha sido creado exitosamente',
            });
        }
    } catch (error) {
        console.error('Error al insertar un rol en la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Elimina un rol de la base de datos
export const deleteRol = async (req: Request, res: Response) => {
    try {
        const { id_rol } = req.body;

        const _rol = await Roles.findOne({
            where: { id_rol: id_rol }
        });

        if (!_rol) {
            return res.status(404).json({
                msg: 'Rol con el ID: ' + id_rol + ' no existe en la base de datos'
            });
        }

        await _rol.destroy();
        res.json({
            msg: 'El rol con el ID: ' + id_rol + ' ha sido eliminado exitosamente',
        });
    } catch (error) {
        console.error('Error al eliminar un rol de la base de datos:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el rol',
            error,
        });
    }
}

// Actualiza el rol en la base de datos
export const updateRoles = async (req: Request, res: Response) => {
<<<<<<< HEAD
    const { id_rol, rol, descripcion, estado_rol, modificado_por, fecha_modificacion  } = req.body;
=======
    try {
        const { id_rol, rol, descripcion, modificado_por, fecha_modificacion } = req.body;
>>>>>>> 1fe3a974d7a1e20dd4e417e08d774c89ca7880ec

        const _rol = await Roles.findOne({
            where: { id_rol: id_rol }
        });

        if (!_rol) {
            return res.status(404).json({
                msg: 'Rol con el ID: ' + id_rol + ' no existe en la base de datos'
            });
        }

        await _rol.update({
            id_rol: id_rol,
            rol: rol,
            descripcion: descripcion,
            modificado_por: modificado_por,
            fecha_modificacion: fecha_modificacion
        });

        res.json({
            msg: 'El Rol con el ID: ' + id_rol + ' ha sido actualizado exitosamente',
        });
    } catch (error) {
        console.error('Error al actualizar un rol de la base de datos:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el rol',
            error,
        });
    }
<<<<<<< HEAD

    await _rol.update({
        id_rol: id_rol,
        rol: rol,
        descripcion: descripcion,
        estado_rol: estado_rol,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion
       
    });
    res.json({
        msg: 'El Rol con el ID: '+ id_rol+  ' ha sido actualizado exitosamente',
    });
=======
>>>>>>> 1fe3a974d7a1e20dd4e417e08d774c89ca7880ec
}

// Inactiva el usuario de la DBA
export const inactivateRol = async (req: Request, res: Response) => {
    try {
        const { rol } = req.body;

        const _rol = await Roles.findOne({
            where: { rol: rol }
        });

        if (!_rol) {
            return res.status(404).json({
                msg: "El Rol no existe: " + rol
            });
        }

        await _rol.update({
            estado: 2
        });

        res.json({
            msg: 'Rol: ' + rol + ' inactivado exitosamente',
        });
    } catch (error) {
        console.error('Error al inactivar un rol:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el rol',
            error,
        });
    }
}

// Activa el usuario de la DBA
export const activateRol = async (req: Request, res: Response) => {
    try {
        const { rol } = req.body;

        const _rol = await Roles.findOne({
            where: { rol: rol }
        });

        if (!_rol) {
            return res.status(404).json({
                msg: "El Rol no existe: " + rol
            });
        }

        await _rol.update({
            estado: 1
        });

        res.json({
            msg: 'Rol: ' + rol + ' ha sido activado exitosamente',
        });
    } catch (error) {
        console.error('Error al activar un rol:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar el rol',
            error,
        });
    }
}
