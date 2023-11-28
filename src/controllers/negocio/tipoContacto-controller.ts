import { Request, Response } from 'express';
import { TipoContacto } from '../../models/negocio/tipoContacto-models';
import jwt from 'jsonwebtoken';

//Obtiene todos los contactos de la base de datos
export const getAllTipoContactos = async (req: Request, res: Response) => {
    try {
        const _cont = await TipoContacto.findAll();
        res.json(_cont);
    } catch (error) {
        console.error('Error al obtener todos los tipos de contacto:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

//Obtiene un contacto de la base de datos
export const getTipoContacto = async (req: Request, res: Response) => {
    try {
        const { tipo_contacto } = req.body;

        const _cont = await TipoContacto.findOne({
            where: {tipo_contacto: tipo_contacto}
        });

        if (_cont) {
            res.json({_cont});
        } else {
            res.status(404).json({
                msg: `El Contacto no existe: ${tipo_contacto}`
            });
        }
    } catch (error) {
        console.error('Error al obtener el tipo de contacto:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

//Inserta un contacto en la base de datos
export const postTipoContacto = async (req: Request, res: Response) => {
    try {
        const { tipo_contacto, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

        const _cont = await TipoContacto.findOne({
            where: {tipo_contacto: tipo_contacto}
        });

        if (_cont) {
            return res.status(400).json({
                msg: 'Contacto ya registrado en la base de datos: '+ tipo_contacto
            });
        } else {
            await TipoContacto.create({
                tipo_contacto: tipo_contacto,
                descripcion: descripcion,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            res.json({
                msg: 'El contacto: '+ tipo_contacto +  ' ha sido creada exitosamente',
            });
        }
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error,
        }); 
    }
}

//Elimina un contacto de la base de datos
export const deleteTipoContacto = async (req: Request, res: Response) => {
    try {
        const { id_tipo_contacto } = req.body;

        const _cont = await TipoContacto.findOne({
            where: { id_tipo_contacto: id_tipo_contacto }
        });

        if (_cont) {
            await _cont.destroy();
            res.json({
                msg: 'El contacto con el ID: ' + id_tipo_contacto + ' ha sido eliminado exitosamente',
            });
        } else {
            res.status(404).json({
                msg: 'No se encontró un contacto con el ID ' + id_tipo_contacto,
            });
        }
    } catch (error) {
        console.error('Error al eliminar el contacto:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el contacto',
            error,
        });
    }
};

//actualiza el contacto en la base de datos
export const updateTipoContacto = async (req: Request, res: Response) => {
    try {
        const { id_tipo_contacto, tipo_contacto, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

        const _cont = await TipoContacto.findOne({
            where: {id_tipo_contacto: id_tipo_contacto}
        });

        if (!_cont) {
            return res.status(404).json({
                msg: 'Contacto con el ID: '+ id_tipo_contacto +' no existe en la base de datos'
            });
        }

        await _cont.update({
            id_tipo_contacto: id_tipo_contacto,
            tipo_contacto: tipo_contacto,
            descripcion: descripcion,
            creado_por: creado_por,
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por,
            fecha_modificacion: fecha_modificacion,
            estado: estado
        });
        res.json({
            msg: 'El Contacto con el ID: '+ id_tipo_contacto +  ' ha sido actualizado exitosamente',
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error,
        });
    }
}

//Inactiva el usuario de la DBA
export const inactivateTipoContacto = async (req: Request, res: Response) => {
    try {
        const { tipo_contacto } = req.body;

        const _cont = await TipoContacto.findOne({
            where: {tipo_contacto: tipo_contacto}
        });

        if (!_cont) {
            return res.status(404).json({
                msg: "El Tipo de Contacto no existe: "+ tipo_contacto
            });
        }

        await _cont.update({
            estado: 2
        });
        res.json({
            msg: 'Tipo de Contacto: '+ tipo_contacto+  ' inactivado exitosamente',
        });
    } catch (error) {
        console.error('Error al inactivar el tipo de contacto:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el tipo de contacto',
            error,
        });
    }
}

//Activa el usuario de la DBA
export const activateTipoContacto = async (req: Request, res: Response) => {
    try {
        const { tipo_contacto } = req.body;

        const _cont = await TipoContacto.findOne({
            where: {tipo_contacto: tipo_contacto}
        });

        if (!_cont) {
            return res.status(404).json({
                msg: "El tipo de Contacto no existe: "+ tipo_contacto
            });
        }

        await _cont.update({
            estado: 1
        });
        res.json({
            msg: 'Tipo de Contacto: '+ tipo_contacto+  ' ha sido activado exitosamente',
        });
    } catch (error) {
        console.error('Error al activar el tipo de contacto:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar el tipo de contacto',
            error,
        });
    }
}











/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */