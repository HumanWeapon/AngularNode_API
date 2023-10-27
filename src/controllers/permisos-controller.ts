import {Request, Response} from 'express';
import { Permisos } from '../models/permisos-models';
import { Roles } from '../models/roles-models';
import { Objetos } from '../models/objetos-models';


//Obtiene todos los permisos de la base de datos
export const getAllPermisos = async (req: Request, res: Response) => {

    const _permisos = await Permisos.findAll();
    res.json(_permisos)

}

//Obtiene un permiso de la base de datos
export const getPermiso = async (req: Request, res: Response) => {
    const { id_permisos } = req.body;

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
}

//Inserta un nuevo permiso 
export const postPermiso = async (req: Request, res: Response) => {
    const {
        id_permisos,
        id_rol,
        id_objeto,
        permiso_insercion,
        permiso_eliminacion,
        permiso_actualizacion,
        permiso_consultar,
        creado_por,
        fecha_creacion,
        modificado_por,
        fecha_modificacion
    } = req.body;

    try {
        // Verifica si el permiso ya existe
        const existingPermiso = await Permisos.findOne({
            where: {
                id_permisos: id_permisos,
        
            }
        });

        if (existingPermiso) {
            return res.status(400).json({
                msg: 'El permiso ya está registrado en la base de datos.'
            });
        } else {
            // Verifica si el rol y el objeto existen en las tablas relacionadas
            const existingRol = await Roles.findByPk(id_rol);
            const existingObjeto = await Objetos.findByPk(id_objeto);

            if (!existingRol || !existingObjeto) {
                return res.status(400).json({
                    msg: 'El rol u objeto especificados no existen en la base de datos.'
                });
            }

            // Crea el nuevo permiso
            const newPermiso = await Permisos.create({                               
                id_rol: id_rol,
                id_objeto: id_objeto,
                permiso_insercion: permiso_insercion,
                permiso_eliminacion: permiso_eliminacion,
                permiso_actualizacion: permiso_actualizacion,
                permiso_consultar: permiso_consultar,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion
            });

            return res.json({
                msg: 'El permiso ha sido creado exitosamente.',
                newPermiso
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error interno, contacta al administrador.',
            error
        });
    }
};

/*Inserta un permiso en la base de datos
export const postPermiso = async (req: Request, res: Response) => {

    const { id_rol, id_objeto, permiso_insercion, permiso_eliminacion, permiso_actualizacion, permiso_consultar, creado_por, fecha_creacion, modificado_por, fecha_modificacion  } = req.body;

    try{
        const _permiso = await Permisos.findOne({
            where: {id_rol: id_rol}
        })
    
        if (_permiso){
            return res.status(400).json({
                msg: 'Permiso ya registrado en la base de datos: '
            })
        }else{
            await Permisos.create({                
                id_rol: id_rol,
                id_objeto: id_objeto, 
                permiso_insercion: permiso_insercion,
                permiso_eliminacion: permiso_eliminacion,
                permiso_actualizacion: permiso_actualizacion,
                permiso_consultar: permiso_consultar,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion
            })
            res.json({
                msg: 'El permiso ha sido creada exitosamente',
            })
        }
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }*/
    /*// Generamos token
    const token = jwt.sign({
        usuario: usuario
    }, process.env.SECRET_KEY || 'Lamers005*');
    res.json(token);*/
//}

//Elimina un permiso de la base de datos
export const deletePermiso = async (req: Request, res: Response) => {
    const { id_permisos } = req.body;

    try {
        const _permisos = await Permisos.findOne({
            where: { id_permisos: id_permisos }
        });

        if (_permisos) {
            await _permisos.destroy();
            res.json({
                msg: 'El permiso ha sido eliminado exitosamente',
            });
        } else {
            res.status(404).json({
                msg: 'No se encontró ningun permiso con esa numeracion',
            });
        }
    } catch (error) {
        console.error('Error al eliminar el permiso:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el permiso',
        });
    }
};


//actualiza el permiso en la base de datos
export const updatePermisos = async (req: Request, res: Response) => {
    const { id_permisos, id_rol, id_objeto, permiso_insercion, permiso_eliminacion, permiso_actualizacion, permiso_consultar, modificado_por, fecha_modificacion  } = req.body;

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
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion
    });
    res.json({
        msg: 'El permiso ha sido actualizado exitosamente',
    });
}