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
    const { id_tipo_telefono } = req.body;

    const _telefono = await tipoTelefono.findOne({
        where: {id_tipo_telefono: id_tipo_telefono}
    });
    if(_telefono){
        res.json(_telefono)
    }
    else{
        res.status(404).json({
            msg: `el ID de la pregunta no existe: ${id_tipo_telefono}`
        })
    }
}


// Inserta un objeto en la base de datos
export const postTelefono = async (req: Request, res: Response) => {

    const {tipo_telefono, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

    try{
        const _telefono = await tipoTelefono.findOne({
            where: {tipo_telefono: tipo_telefono}
        })
    
            await tipoTelefono.create({
                tipo_telefono: tipo_telefono,
                descripcion: descripcion, 
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            })
            res.json({
                msg: 'El Telefono: '+ tipo_telefono+  ' ha sido creada exitosamente',
            })
        
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}



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
