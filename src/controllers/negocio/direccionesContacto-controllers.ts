import { Request, Response } from 'express';
import { DireccionesContactos } from '../../models/negocio/direccionesContacto-model';

// Obtiene todas las Direcciones de Contactos
export const getAllDirecContactos = async (req: Request, res: Response) => {
    try {
        const _direcontactos = await DireccionesContactos.findAll();
        res.json(_direcontactos);
    } catch (error) {
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
};

// Obtiene una Dirección de Contacto por ID
export const getDirecContactos = async (req: Request, res: Response) => {
    try {
        const { id_contacto } = req.body;
        const _direcontactos = await DireccionesContactos.findAll({
            where: { id_contacto: id_contacto },
        });
        if (_direcontactos) {
            res.json(_direcontactos);
        } else {
            res.status(404).json({
                msg: `el ID de la Direccion Contacto no existe: ${id_contacto}`,
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
};

// Inserta una nueva Dirección de Contacto en la base de datos
export const postDirecContactos = async (req: Request, res: Response) => {
    try {
        const { id_contacto, id_tipo_direccion, direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
        const _direcontactos = await DireccionesContactos.findOne({
            where: { direccion: direccion },
        });

        if (_direcontactos) {
            return res.status(400).json({
                msg: 'Direccion Contacto ya registrada en la base de datos: ' + direccion,
            });
        } else {
            const _direcontactos = await DireccionesContactos.create({
                id_contacto: id_contacto,
                id_tipo_direccion: id_tipo_direccion,
                direccion: direccion,
                descripcion: descripcion,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado,
            });
            res.json(_direcontactos);
        }
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error,
        });
    }
};

// Elimina la Dirección de Contacto de la base de datos
export const deleteDirecContactos = async (req: Request, res: Response) => {
    try {
        const { id_direccion } = req.body;
        const _direcontactos = await DireccionesContactos.findOne({
            where: { id_direccion: id_direccion },
        });

        if (_direcontactos) {
            await _direcontactos.destroy();
            res.json({
                msg: 'La Direccion Contacto con el ID: ' + id_direccion + ' ha sido eliminada exitosamente',
            });
        } else {
            res.status(404).json({
                msg: 'No se encontró una Direccion Contacto con el ID ' + id_direccion,
            });
        }
    } catch (error) {
        console.error('Error al eliminar la Direccion Contacto:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la Direccion Contacto',
        });
    }
};

// Actualiza la Dirección de Contacto en la base de datos
export const updateDirecContactos = async (req: Request, res: Response) => {
    try {
        const { id_direccion, id_contacto, id_tipo_direccion, direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
        const _direcontactos = await DireccionesContactos.findOne({
            where: { id_direccion: id_direccion },
        });

        if (!_direcontactos) {
            return res.status(404).json({
                msg: 'Direccion Contacto con el ID: ' + id_direccion + ' no existe en la base de datos',
            });
        }

        const direcontactos = await _direcontactos.update({
            id_direccion: id_direccion,
            id_contacto: id_contacto,
            id_tipo_direccion: id_tipo_direccion,
            direccion: direccion,
            descripcion: descripcion,
            creado_por: creado_por,
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por,
            fecha_modificacion: fecha_modificacion,
            estado: estado,
        });
        res.json(direcontactos);
    } catch (error) {
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
};

// Inactiva la Dirección de Contacto de la DBA
export const inactivateDirecContactos = async (req: Request, res: Response) => {
    try {
        const { direccion } = req.body;
        const _direcontactos = await DireccionesContactos.findOne({
            where: { direccion: direccion },
        });

        if (!_direcontactos) {
            return res.status(404).json({
                msg: 'La Direccion Contacto no existe: ' + direccion,
            });
        }

        await _direcontactos.update({
            estado: 2,
        });
        res.json({
            msg: 'Direccion Contacto: ' + direccion + ' inactivado exitosamente',
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
};

// Activa la Dirección de Contacto de la DBA
export const activateDirecContactos = async (req: Request, res: Response) => {
    try {
        const { direccion } = req.body;
        const _direcontactos = await DireccionesContactos.findOne({
            where: { direccion: direccion },
        });

        if (!_direcontactos) {
            return res.status(404).json({
                msg: 'La Direccion Contacto no existe: ' + direccion,
            });
        }

        await _direcontactos.update({
            estado: 1,
        });
        res.json({
            msg: 'Direccion Contacto: ' + direccion + ' ha sido activado exitosamente',
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
};


