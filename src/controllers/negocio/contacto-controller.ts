import {Request, Response} from 'express';
import { Contacto } from '../../models/negocio/contacto-models';
import jwt from 'jsonwebtoken';


//Obtiene todos las ciudades de la base de datos
export const getAllContactos = async (req: Request, res: Response) => {

    const _contacto = await Contacto.findAll();
    res.json(_contacto)

}

//Obtiene un contacto de la base de datos     
export const getContacto = async (req: Request, res: Response) => {
    const { contacto } = req.body;

    const _contacto = await Contacto.findOne({
        where: {contacto: contacto}
    });
    if(_contacto){
        res.json({_contacto})
    }
    else{
        res.status(404).json({
            msg: `El contacto no existe: ${contacto}`
        })
    }
}

//Inserta un contacto en la base de datos
export const postContacto = async (req: Request, res: Response) => {

    const { dni, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

    try{
        const _contacto = await Contacto.findOne({
            where: {dni: dni}
        })
    
        if (_contacto){
            return res.status(400).json({
                msg: 'DNI ya registrada en la base de datos: '+ dni
            })
        }else{
            const contac = await Contacto.create({
                dni: dni,
                primer_nombre: primer_nombre,
                segundo_nombre: segundo_nombre,
                primer_apellido: primer_apellido,
                segundo_apellido: segundo_apellido,
                correo: correo,
                descripcion: descripcion, 
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            })
            res.json(contac)
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
    const { id_contacto, id_tipo_contacto, dni, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado  } = req.body;

    const _contacto = await Contacto.findOne({
        where: {id_contacto: id_contacto}
    });
    if(!_contacto){
        return res.status(404).json({
            msg: 'Contacto con el ID: '+ id_contacto +' no existe en la base de datos'
        });
    }

    await _contacto.update({
        id_contacto: id_contacto,
        id_tipo_contacto: id_tipo_contacto,
        dni: dni,
        primer_nombre: primer_nombre,
        segundo_nombre: segundo_nombre,
        primer_apellido: primer_apellido,
        segundo_apellido: segundo_apellido,
        correo: correo,
        descripcion: descripcion, 
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json({
        msg: 'El contacto con el ID: '+ id_contacto+  ' ha sido actualizado exitosamente',
    });
}












/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */