import {Request, Response} from 'express';
import { Ciudades } from '../../models/negocio/ciudades-models';
import jwt from 'jsonwebtoken';
import { Paises } from '../../models/negocio/paises-models';


// Obtiene todas las ciudades de la base de datos
export const getAllCiudades = async (req: Request, res: Response) => {
    try {
        const _ciudades = await Ciudades.findAll({
            include: {
                model: Paises, // El modelo que deseas incluir
                as: 'pais' // El alias para referenciar al país en los resultados
            }
        });
        res.json(_ciudades);
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener las ciudades:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

//Obtiene una ciudad de la base de datos     
export const getCiudad = async (req: Request, res: Response) => {
    const { ciudad } = req.body;
try {
    const _ciudad = await Ciudades.findOne({
        where: {ciudad: ciudad}
    });
    if(_ciudad){
        res.json({_ciudad})
    }
    else{
        res.status(404).json({
            msg: `La ciudad no existe: ${ciudad}`
        })
    }
} catch (error) {
    res.status(400).json({
        msg: 'Contactate con el administrador',
        error
    }); 
}
}

//Inserta una ciudad en la base de datos
export const postCiudad = async (req: Request, res: Response) => {

    const { ciudad, id_pais, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

    try{
        const _ciudad = await Ciudades.findOne({
            where: {ciudad: ciudad}
        })
    
        if (_ciudad){
            return res.status(400).json({
                msg: 'Ciudad ya registrada en la base de datos: '+ ciudad
            })
        }else{
            const newCuidad = await Ciudades.create({
                ciudad: ciudad.toUpperCase(),
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                id_pais:id_pais,
                estado: estado
            })
            res.json(newCuidad)
        }
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}

// Realiza una consulta INNER JOIN entre las tablas Usuario y Roles
export const ciudadesAllPaises = async (req: Request, res: Response) => {
    try {
        const ciudad = await Ciudades.findAll({
            include: [
                {
                    model: Paises,
                    as: 'pais' // Usa el mismo alias que en la definición de la asociación
                },
            ],
        });
        
        res.json(ciudad);
    } catch (error) {
        console.error('Error al obtener Ciudades de Paises', error);
        res.status(500).json({ error: 'Error al obtener preguntas de usuario' });
    }
}

//Elimina una ciudad de la base de datos
export const deleteCiudad = async (req: Request, res: Response) => {
    const { id_ciudad } = req.body;

    try {
        const _ciudad = await Ciudades.findOne({
            where: { id_ciudad: id_ciudad }
        });

        if (_ciudad) {
            await _ciudad.destroy();
            res.json(_ciudad);
        } else {
            res.status(404).json({
                msg: 'No se encontró una ciudad con el ID ' + id_ciudad,
            });
        }
    } catch (error) {
        console.error('Error al eliminar el Ciudad:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la Ciudad',
        });
    }
};


//actualiza la ciudad en la base de datos
export const updateCiudad = async (req: Request, res: Response) => {
 
    const { id_ciudad, ciudad, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado, id_pais  } = req.body;
    try {
    const _ciudad = await Ciudades.findOne({
        where: {id_ciudad: id_ciudad}
    });
    if(!_ciudad){
        return res.status(404).json({
            msg: 'Ciudad con el ID: '+ id_ciudad +' no existe en la base de datos'
        });
    }

    await _ciudad.update({
        id_ciudad: id_ciudad,
        ciudad: ciudad.toUpperCase(),
        descripcion: descripcion.toUpperCase(),
        creado_por: creado_por.toUpperCase(),
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por.toUpperCase(),
        fecha_modificacion: fecha_modificacion,
        estado: estado,
        id_pais: id_pais
    });
    res.json(_ciudad);

} catch (error) {
    console.error('Error al actualizar la ciudad:', error);
    res.status(500).json({ 
        msg: 'Hubo un error al actualizar la ciudad',
});
}
}


//Inactiva el usuario de la DBA
export const inactivateCiudad = async (req: Request, res: Response) => {
  
    const { id_ciudad, ciudad, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado, id_pais  } = req.body;
    try {
    const _ciudad = await Ciudades.findOne({
        where: {ciudad: ciudad}
    });
    if(!ciudad){
        return res.status(404).json({
            msg: "La Ciudad no existe: "+ ciudad
        });
    }

    await _ciudad.update({
        estado: 2
    });
    res.json(_ciudad);

    } catch (error) {
        console.error('Error al inactivar la ciudad:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar la ciudad',

        });
    }
}

//Activa el usuario de la DBA
export const activateCiudad = async (req: Request, res: Response) => {
   
    const { id_ciudad, ciudad, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado, id_pais  } = req.body;
    try {
    const _ciudad = await Ciudades.findOne({
        where: {ciudad: ciudad}
    });
    if(!ciudad){
        return res.status(404).json({
            msg: "La Ciudad no existe: "+ ciudad
        });
    }

    await _ciudad.update({
        estado: 1
    });
    res.json(_ciudad);

    } catch (error) {
        console.error('Error al activar la ciudad:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar la ciudad',

        });
    }
}
//Obtiene todos las ciudades de la base de datos
export const getCiudades = async (req: Request, res: Response) => {
    const _ciudades = await Ciudades.findAll();
    res.json(_ciudades)

}














/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */