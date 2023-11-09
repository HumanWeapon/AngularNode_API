import {Request, Response} from 'express';
import { Ciudades } from '../../models/negocio/ciudades-models';
import jwt from 'jsonwebtoken';


//Obtiene todos las ciudades de la base de datos
export const getAllCiudades = async (req: Request, res: Response) => {

    const _ciudades = await Ciudades.findAll();
    res.json(_ciudades)

}

//Obtiene una ciudad de la base de datos     
export const getCiudad = async (req: Request, res: Response) => {
    const { ciudad } = req.body;

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
}

//Inserta una ciudad en la base de datos
export const postCiudad = async (req: Request, res: Response) => {

    const { ciudad, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

    try{
        const _ciudad = await Ciudades.findOne({
            where: {ciudad: ciudad}
        })
    
        if (_ciudad){
            return res.status(400).json({
                msg: 'Ciudad ya registrada en la base de datos: '+ ciudad
            })
        }else{
            await Ciudades.create({
                ciudad: ciudad,
                descripcion: descripcion, 
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            })
            res.json({
                msg: 'La ciudad: '+ ciudad+  ' ha sido creada exitosamente',
            })
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
export const deleteCiudad = async (req: Request, res: Response) => {
    const { id_ciudad } = req.body;

    try {
        const _ciudad = await Ciudades.findOne({
            where: { id_ciudad: id_ciudad }
        });

        if (_ciudad) {
            await _ciudad.destroy();
            res.json({
                msg: 'La ciudad con el ID: ' + id_ciudad + ' ha sido eliminada exitosamente',
            });
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
    const { id_ciudad, ciudad, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado  } = req.body;

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
        ciudad: ciudad,
        descripcion: descripcion, 
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json({
        msg: 'La cuidad con el ID: '+ id_ciudad+  ' ha sido actualizado exitosamente',
    });
}


//Inactiva el usuario de la DBA
export const inactivateCiudad = async (req: Request, res: Response) => {
    const { ciudad } = req.body;

    const ciu = await Ciudades.findOne({
        where: {ciudad: ciudad}
    });
    if(!ciu){
        return res.status(404).json({
            msg: "La Ciudad no existe: "+ ciudad
        });
    }

    await ciu.update({
        estado: 2
    });
    res.json({
        msg: 'Ciudad: '+ ciudad+  ' inactivado exitosamente',
    });
}

//Activa el usuario de la DBA
export const activateCiudad = async (req: Request, res: Response) => {
    const { ciudad } = req.body;

    const ciu = await Ciudades.findOne({
        where: {ciudad: ciudad}
    });
    if(!ciu){
        return res.status(404).json({
            msg: "La Ciudad no existe: "+ ciudad
        });
    }

    await ciu.update({
        estado: 1
    });
    res.json({
        msg: 'Ciudad: '+ ciudad+  ' ha sido activado exitosamente',
    });
}















/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */