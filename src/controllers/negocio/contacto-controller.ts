import {Request, Response} from 'express';
import { Contacto } from '../../models/negocio/contacto-models';
import jwt from 'jsonwebtoken';
import { TipoContacto } from '../../models/negocio/tipoContacto-models';


//Obtiene todos las ciudades de la base de datos
export const getAllContactos = async (req: Request, res: Response) => {

    const _contacto = await Contacto.findAll();
    res.json(_contacto)

}

//Obtiene todos las contactos con el tipo de contacto de la base de datos
export const getAllContactosconTipoContacto = async (req: Request, res: Response) => {
    try {
        const _contacto = await Contacto.findAll({
            include: {
                model: TipoContacto,
                as: 'tipo_contacto',
                where: {
                    estado: 1
                },
                attributes: ['id_tipo_contacto', 'tipo_contacto']
            }
        });
        res.json(_contacto);
    } catch (error) {
        console.error('Error al obtener los contactos:', error);
        res.status(500).json({
            msg: 'Hubo un error al obtener los contactos'
        });
    }
}

//Obtiene un contacto de la base de datos     
export const getContacto = async (req: Request, res: Response) => {
    const { dni } = req.body;
try {
    const _contacto = await Contacto.findAll({
        where: {dni: dni}
    });
    if(_contacto){
        res.json(_contacto)
    }
    else{
        res.status(404).json({
        
            msg: `El contacto con el RTN:${dni} no existe`
        })
    }
} catch (error) {
    res.status(400).json({
        msg: 'Contactate con el administrador',
        error
    }); 
}
}
//Inserta un contacto en la base de datos
export const postContacto = async (req: Request, res: Response) => {

    const { dni, id_tipo_contacto, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

    try{
        const contac = await Contacto.create({
            id_tipo_contacto: id_tipo_contacto,
            primer_nombre: primer_nombre.toUpperCase(),
            segundo_nombre: segundo_nombre.toUpperCase(),
            primer_apellido: primer_apellido.toUpperCase(),
            segundo_apellido: segundo_apellido.toUpperCase(),
            descripcion: descripcion.toUpperCase(),
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion,
            estado: estado
        })
        res.json(contac)
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}

//Elimina una ciudad de la base de datos
export const deleteContacto = async (req: Request, res: Response) => {
    const { id_contacto } = req.body;

    try {
        const _contacto = await Contacto.findOne({
            where: { id_contacto: id_contacto }
        });

        if (_contacto) {
            await _contacto.destroy();
            res.json(_contacto);
        } else {
            res.status(404).json({
                msg: 'No se encontró el contacto con el ID ' + id_contacto,
            });
        }
    } catch (error) {
        console.error('Error al eliminar el Ciudad:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la Ciudad',
        });
    }
};


//actualiza el contacto en la base de datos
export const updateContacto = async (req: Request, res: Response) => {
   
    const { id_contacto, id_tipo_contacto, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado  } = req.body;
    try {
    const _contacto = await Contacto.findOne({
        where: {id_contacto: id_contacto}
    });
    if(!_contacto){
        return res.status(404).json({
            msg: 'Contacto con el ID: '+ id_contacto +' no existe en la base de datos'
        });
    }

    await _contacto.update({
        id_tipo_contacto: id_tipo_contacto,
        primer_nombre: primer_nombre.toUpperCase(),
        segundo_nombre: segundo_nombre.toUpperCase(),
        primer_apellido: primer_apellido.toUpperCase(),
        segundo_apellido: segundo_apellido.toUpperCase(),
        descripcion: descripcion.toUpperCase(),
        creado_por: creado_por.toUpperCase(),
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por.toUpperCase(),
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json(_contacto);


} catch (error) {
    console.error('Error al actualizar el contacto:', error);
    res.status(500).json({
        msg: 'Hubo un error al actualizar el contacto',
    });
}
}

//Inactiva el usuario de la DBA
export const inactivateContacto = async (req: Request, res: Response) => {

    const { primer_nombre } = req.body;
    try {
    const _contacto = await Contacto.findOne({
        where: {primer_nombre: primer_nombre}
    });
    if(!_contacto){
        return res.status(404).json({
            msg: "El Contacto no existe: "+ primer_nombre
        });
    }

    await _contacto.update({
        estado: 2
    });
    res.json(_contacto);

} catch (error) {
    console.error('Error al inactivar el contacto:', error);
    res.status(500).json({
        msg: 'Hubo un error al inactivar el contacto',
    });
}

}

//Activa el usuario de la DBA
export const activateContacto = async (req: Request, res: Response) => {

    const { primer_nombre } = req.body;
    try {
    const _contacto = await Contacto.findOne({
        where: {primer_nombre: primer_nombre}
    });
    if(!_contacto){
        return res.status(404).json({
            msg: "El Contacto no existe: "+ primer_nombre
        });
    }

    await _contacto.update({
        estado: 1
    });
    res.json(_contacto);

} catch (error) {
    console.error('Error al activar el contacto:', error);
    res.status(500).json({
        msg: 'Hubo un error al activar el contacto',
    });
}

}










/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */