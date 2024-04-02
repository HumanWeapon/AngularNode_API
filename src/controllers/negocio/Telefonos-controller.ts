import {Request, Response} from 'express';
import { ContactoTelefono } from '../../models/negocio/telefonos-models';
import db from '../../db/connection';
import { Contacto } from '../../models/negocio/contacto-models';
import { Paises } from '../../models/negocio/paises-models';


//Obtiene todos los contactos de la base de datos
export const getAllContactosTelefono = async (req: Request, res: Response) => {
    try {
        const _contactoT = await ContactoTelefono.findAll();
        res.json(_contactoT)
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
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

    const { id_contacto, id_pais, telefono, cod_area,  descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

    try{
        const _contactoT = await ContactoTelefono.findOne({
            where: {telefono: telefono}
        })

        if (_contactoT){
            return res.status(400).json({
                msg: 'Telefono ya registrado en la Base de Datos: ' + telefono
            })
        }else{

            const _contactoT = await ContactoTelefono.create({
                id_contacto: id_contacto,
                id_pais: id_pais,
                telefono: telefono,
                cod_area: cod_area,
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: Date.now(),
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: Date.now(),
                estado: estado
            })
            return res.json(_contactoT);
        }
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
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
    
    const { id_telefono, id_contacto, id_pais, telefono, cod_area, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado  } = req.body;
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
            id_pais: id_pais,
            telefono: telefono,
            cod_area: cod_area,
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

// Realiza una consulta INNER JOIN entre las tablas Usuario y Roles
export const telefonosAllContactos = async (req: Request, res: Response) => {
    try {
        const telefono = await ContactoTelefono.findAll({
            include: [
                {
                    model: Contacto,
                    as: 'contacto' // Usa el mismo alias que en la definición de la asociación
                },
            ],
        });
        
        res.json(telefono);
    } catch (error) {
        console.error('Error al obtener el telefono del contacto:', error);
        res.status(500).json({ error: 'Error al obtener telefonos del Contacto' });
    }
}

export const telefonosAllContactosPaises = async (req: Request, res: Response) => {
    try {
        const telefonosConContactosYPaises = await ContactoTelefono.findAll({
            include: [
                {
                    model: Contacto,
                    as: 'contacto'
                },
                {
                    model: Paises, // Agrega el modelo de Pais
                    as: 'paises' // Usa el mismo alias que en la definición de la asociación en el modelo
                }
            ],
        });
        
        res.json(telefonosConContactosYPaises);
    } catch (error) {
        console.error('Error al obtener el teléfono del contacto:', error);
        res.status(500).json({ error: 'Error al obtener teléfonos del Contacto' });
    }
}

/*export const telefonosconcontacto = async (req: Request, res: Response) => {
    try {
        const query = `
        SELECT 
            TELEFONOS.id_telefono,
            CONTACTOS.NOMBRE,
            TELEFONOS.telefono, 
            TELEFONOS.extencion, 
            TELEFONOS.descripcion, 
            TELEFONOS.creado_por, 
            TELEFONOS.fecha_creacion, 
            TELEFONOS.modificado_por, 
            TELEFONOS.fecha_modificacion, 
            TELEFONOS.estado, 
            TELEFONOS.id_contacto,
            TELEFONOS.id_pais
        FROM mipyme.tbl_me_telefonos AS TELEFONOS
        LEFT JOIN 
            (
                SELECT id_contacto, estado, (primer_nombre||' '||segundo_nombre||' '||primer_apellido||' '||segundo_apellido) AS NOMBRE 
                FROM mipyme.tbl_me_contactos
                WHERE estado = 1
            ) AS CONTACTOS
        ON TELEFONOS.id_contacto = CONTACTOS.id_contacto
        WHERE CONTACTOS.nombre IS NOT NULL 
        `;
        const [results, metadata] = await db.query(query);

        res.json(results);
    } catch (error) {
        console.error('Error al consultar telefonos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};*/

export const telefonosdeContactosPorId = async (req: Request, res: Response) => {
    const { id_contacto } = req.body; // Obtener el id_contacto de los parámetros de consulta

    try {
        // Buscar los teléfonos asociados al id_contacto
        const telefonos = await ContactoTelefono.findAll({
            where: {
                id_contacto: id_contacto // Filtrar por id_contacto
            },
            include: [
                {
                    model: Contacto,
                    as: 'contacto'
                },
                {
                    model: Paises,
                    as: 'paises' // Incluir la relación con la tabla de países
                }
            ],
        });

        res.json(telefonos); // Enviar los teléfonos encontrados como respuesta
    } catch (error) {
        console.error('Error al obtener los teléfonos del contacto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

/*export const telefonosdeContactosPorId = async (req: Request, res: Response) => {
    const { id_contacto } = req.params;
    try {
        const query = `
        SELECT 
            TELEFONOS.id_telefono, 
            TELEFONOS.telefono, 
            (CONTACTOS.primer_nombre||' '||CONTACTOS.segundo_nombre||' '||CONTACTOS.primer_apellido||' '||CONTACTOS.segundo_apellido) AS CONTACTO,
            TELEFONOS.extencion, 
            TELEFONOS.descripcion, 
            TELEFONOS.creado_por, 
            TELEFONOS.fecha_creacion, 
            TELEFONOS.modificado_por, 
            TELEFONOS.fecha_modificacion, 
            TELEFONOS.estado, 
            TELEFONOS.id_contacto,
            TELEFONOS.id_pais
        FROM mipyme.tbl_me_telefonos AS TELEFONOS
        LEFT JOIN 
            (
                SELECT id_contacto, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, estado
                FROM mipyme.tbl_me_contactos
                WHERE estado = 1
            ) AS CONTACTOS
        ON 
        TELEFONOS.id_contacto = CONTACTOS.id_contacto
        WHERE TELEFONOS.id_contacto = ${id_contacto}
            AND TELEFONOS.estado = 1
        `;

        const [results, metadata] = await db.query(query);

        res.json(results);
    } catch (error) {
        console.error('Error al consultar telefonos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};*/

export const getcontactosActivos = async (req: Request, res: Response) => {
    try {
        const query = `
        SELECT id_contacto, (primer_nombre||' '||segundo_nombre||' '||primer_apellido||' '||segundo_apellido) AS contacto 
        FROM mipyme.tbl_me_contactos
        WHERE estado = 1
        `;

        const [results, metadata] = await db.query(query);

        res.json(results);
    } catch (error) {
        console.error('Error al consultar contactos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};










/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */