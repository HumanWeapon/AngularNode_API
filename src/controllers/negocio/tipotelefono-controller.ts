import {Request, Response} from 'express';
import { tipoTelefono } from '../../models/negocio/tipo_telefono-models';
import { where } from 'sequelize';

//Obtiene todos los telefonos de la base de datos
export const getAllTelefonos = async (req: Request, res: Response) => {
    const tipotelefonos = await tipoTelefono.findAll();
    res.json(tipotelefonos)
}

// Obtiene un teléfono de la base de datos por su ID
export const getTelefono = async (req: Request, res: Response) => {
    const { id_tipo_telefono } = req.params; // Obtén el ID desde los parámetros de la URL

    try {
        const tipotelefono = await tipoTelefono.findOne({
            where: { id_tipo_telefono: id_tipo_telefono }
        });

        if (tipotelefono) {
            res.json(tipotelefono); // Devuelve el teléfono encontrado
        } else {
            res.status(404).json({
                msg: 'No se encontró un teléfono con el ID ' + id_tipo_telefono,
            });
        }
    } catch (error) {
        console.error('Error al obtener el teléfono:', error);
        res.status(500).json({
            msg: 'Hubo un error al obtener el teléfono',
        });
    }
};


// Inserta un objeto en la base de datos
export const postTelefono = async (req: Request, res: Response) => {
    const { tipo_telefono, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

    try {
        const existingTelefono = await tipoTelefono.findOne({ where: { tipo_telefono: tipo_telefono } });

        if (existingTelefono) {
            return res.status(400).json({
                msg: 'El Teléfono ya está registrado en la base de datos: ' + tipo_telefono,
            });
        } else {
            const newTelefono = await tipoTelefono.create({
                tipo_telefono: tipo_telefono,
                descripcion: descripcion,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado,
            });

            if (newTelefono) {
                res.status(201).json({
                    msg: 'El Teléfono: ' + tipo_telefono + ' ha sido creado exitosamente',
                });
            } else {
                res.status(500).json({
                    msg: 'No se pudo insertar el Teléfono en la base de datos',
                });
            }
        }
    } catch (error) {
        console.error('Error al insertar el Teléfono:', error);
        res.status(500).json({
            msg: 'Hubo un error al insertar el Teléfono en la base de datos',
        });
    }
};



// Elimina un teléfono de la base de datos
export const deleteTelefono = async (req: Request, res: Response) => {
    const { id_tipo_telefono } = req.params; // Obtén el ID desde los parámetros de la URL

    try {
        const _telefono = await tipoTelefono.findOne({
            where: { id_tipo_telefono: id_tipo_telefono }
        });

        if (_telefono) {
            await _telefono.destroy();
            res.json({
                msg: 'El Teléfono con el ID: ' + id_tipo_telefono + ' ha sido eliminado exitosamente',
            });
        } else {
            res.status(404).json({
                msg: 'No se encontró un Teléfono con el ID ' + id_tipo_telefono,
            });
        }
    } catch (error) {
        console.error('Error al eliminar el Teléfono:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el Teléfono',
        });
    }
};


//actualiza el Telefono en la base de datos
export const updateTelefono = async (req: Request, res: Response) => {
    const { id_tipo_telefono, tipo_telefono, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

    const _telefono = await tipoTelefono.findOne({
        where: {id_tipo_telefono: id_tipo_telefono}
    });
    if(!_telefono){
        return res.status(404).json({
            msg: 'Telefono con el ID: '+ id_tipo_telefono +' no existe en la base de datos'
        });
    }

    await _telefono.update({
        id_tipo_telefono: id_tipo_telefono,
        tipo_telefono: tipo_telefono,
        descripcion: descripcion, 
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json({
        msg: 'El Telefono con el ID: '+ id_tipo_telefono+  ' ha sido actualizado exitosamente',
    });
}
