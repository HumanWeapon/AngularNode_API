import {Request, Response} from 'express';
import { ContactoTelefono } from '../../models/negocio/contactoTelefono-models';
import jwt from 'jsonwebtoken';


//Obtiene todos los contactos de la base de datos
export const getAllContactosTelefono = async (req: Request, res: Response) => {

    const _contactoT = await ContactoTelefono.findAll();
    res.json(_contactoT)

}

//Obtiene un contacto de la base de datos     
export const getContactoTelefono = async (req: Request, res: Response) => {
    const { id_contacto } = req.body;
try {
    const _contactoT = await ContactoTelefono.findAll({
        where: {id_contacto: id_contacto}
    });
    if(_contactoT){
        res.json(_contactoT)
    }
    else{
        res.status(404).json({
            msg: `No existen datos: ${id_contacto}`
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
export const postContactoTelefono = async (req: Request, res: Response) => {

    const { id_contacto, id_tipo_telefono, telefono, extencion,  descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

    try{
        const _contactoT = await ContactoTelefono.findOne({
            where: {telefono: telefono}
        })
    
        if (_contactoT){
            return res.status(400).json({
                msg: 'Telefono ya registrado en la base de datos: '+ telefono
            })
        }else{
            const newConT = await ContactoTelefono.create({
                id_contacto: id_contacto,
                id_tipo_telefono: id_tipo_telefono,
                telefono: telefono,
                extencion: extencion,
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado: estado
            })
            res.json(newConT)
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

//Elimina una ciudad de la base de datos
export const deleteContactoTelefono = async (req: Request, res: Response) => {
    const { id_telefono } = req.body;

    try {
        const _contactoT = await ContactoTelefono.findOne({
            where: { id_telefono: id_telefono }
        });

        if (_contactoT) {
            await _contactoT.destroy();
            res.json(_contactoT);
        } else {
            res.status(404).json({
                msg: 'No se encontró un telefono con el ID ' + id_telefono,
            });
        }
    } catch (error) {
        console.error('Error al eliminar el telefono:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el telefono',
        });
    }
};


//actualiza el telefono en la base de datos
export const updateContactoTelefono = async (req: Request, res: Response) => {
    
    const { id_telefono, id_contacto, id_tipo_telefono, telefono, extencion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado  } = req.body;
    try {
    const _contactoT = await ContactoTelefono.findOne({
        where: {id_telefono: id_telefono}
    });
    if(!_contactoT){
        return res.status(404).json({
            msg: 'Telefono con el ID: '+ id_telefono +' no existe en la base de datos'
        });
    }

    await _contactoT.update({
        id_telefono: id_telefono,
        id_contacto: id_contacto,
        id_tipo_telefono: id_tipo_telefono,
        extencion: extencion,
        descripcion: descripcion.toUpperCase(),
        creado_por: creado_por.toUpperCase(),
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por.toUpperCase(),
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json(_contactoT);

} catch (error) {
    console.error('Error al actualizar el contacto telefono:', error);
    res.status(500).json({
        msg: 'Hubo un error al actualizar el contacto telefono:',
    });
}
}
    //Inactiva el usuario de la DBA
    export const inactivateContactoTelefono = async (req: Request, res: Response) => {
       
    const { telefono } = req.body;
    try {
    const _contactoT = await ContactoTelefono.findOne({
        where: {telefono: telefono}
    });
    if(!_contactoT){
        return res.status(404).json({
            msg: "El Telefono no existe: "+ telefono
        });
    }

    await _contactoT.update({
        estado: 2
    });
    res.json(_contactoT);

} catch (error) {
    console.error('Error al inactivar el contacto telefono:', error);
    res.status(500).json({
        msg: 'Hubo un error al inactivar el contacto telefono:',
    });
}
}

//Activa el usuario de la DBA
export const activateContactoTelefono = async (req: Request, res: Response) => {
    
    const { telefono } = req.body;
    try {
    const _contactoT = await ContactoTelefono.findOne({
        where: {telefono: telefono}
    });
    if(!_contactoT){
        return res.status(404).json({
            msg: "El Telefono no existe: "+ telefono
        });
    }

    await _contactoT.update({
        estado: 1
    });
    res.json(_contactoT);

} catch (error) {
    console.error('Error al activar el contacto telefono:', error);
    res.status(500).json({
        msg: 'Hubo un error al activar el contacto telefono',
    });
}
}
















/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */