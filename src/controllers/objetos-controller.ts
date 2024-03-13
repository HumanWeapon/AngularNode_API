import {Request, Response} from 'express';
import { Objetos } from '../models/objetos-models';
import db from '../db/connection';


//Obtiene todos los objetos de la base de datos
export const getAllObjetos = async (req: Request, res: Response) => {

    const _objetos = await Objetos.findAll();
    res.json(_objetos)

}

//Obtiene un objeto de la base de datos     
export const getObjeto = async (req: Request, res: Response) => {
    const { objeto } = req.body;
try{
    const _objeto = await Objetos.findOne({
        where: {objeto: objeto}
    });
    if(_objeto){
        res.json({_objeto})
    }
    else{
        res.status(404).json({
            msg: `el  objeto no existe: ${objeto}`
        })
    }
} catch (error) {
    res.status(400).json({
        msg: 'Contactate con el administrador',
        error
    }); 
}
}

//Inserta un objeto en la base de datos
export const postObjeto = async (req: Request, res: Response) => {
    const { objeto, descripcion, tipo_objeto, url, icono, creado_por, modificado_por, fecha_modificacion, fecha_creacion, estado_objeto} = req.body;
    try {
        const _objeto = await Objetos.findOne({ where: { objeto: objeto }});
        if (_objeto){
            return res.status(400).json({
                msg: 'Objeto ya registrado en la base de datos: '+ objeto
            });
        } else {
            const nuevoObjeto = await Objetos.create({
                objeto: objeto.toUpperCase(),
                tipo_objeto: tipo_objeto.toUpperCase(),
                descripcion: descripcion.toUpperCase(), 
                creado_por: creado_por.toUpperCase(),
                url: null,
                icono: null,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado_objeto: estado_objeto
            });
            return res.status(200).json({
                msg: 'Objeto creado exitosamente',
                objeto: nuevoObjeto // Devuelve el nuevo objeto creado
            });
        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Contactate con el administrador',
            error: error
        }); 
    }
}


//Elimina un objeto de la base de datos
export const deleteObjeto = async (req: Request, res: Response) => {
    const { id_objeto } = req.body;

    try {
        const _objeto = await Objetos.findOne({
            where: { id_objeto: id_objeto }
        });

        if (_objeto) {
            await _objeto.destroy();
            res.json(_objeto);
        } else {
            res.status(404).json({
                msg: 'No se encontró un objeto con el ID ' + id_objeto,
            });
        }
    } catch (error) {
        console.error('Error al eliminar el parámetro:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el parámetro',
        });
    }
};


//actualiza el objeto en la base de datos
export const updateObjetos = async (req: Request, res: Response) => {
  
    const { id_objeto, objeto, descripcion, tipo_objeto, creado_por, fecha_creacion, modificado_por, fecha_modificacion  } = req.body;
    try {
    const _objeto = await Objetos.findOne({
        where: {id_objeto: id_objeto}
    });
    if(!_objeto){
        return res.status(404).json({
            msg: 'Objeto con el ID: '+ id_objeto +' no existe en la base de datos'
        });
    }

    await _objeto.update({
        id_objeto: id_objeto,
        objeto: objeto,
        descripcion: descripcion, 
        tipo_objeto: tipo_objeto,
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion
    });
    res.json(_objeto);
} catch (error) {
    console.error('Error al actualizar el objeto:', error);
    res.status(500).json({ 
        msg: 'Hubo un error al actualizar el objeto',
});
}
}

//Inactiva el OBJ de la DBA
export const inactivateObjecto = async (req: Request, res: Response) => {
    
    const { objeto } = req.body;
    try {
    const _objeto = await Objetos.findOne({
        where: {objeto: objeto}
    });
    if(!_objeto){
        return res.status(404).json({
            msg: "El Objeto no existe: "+ objeto
        });
    }

    await _objeto.update({
        estado_objeto: 2
    });
    
    res.json(_objeto);
} catch (error) {
    console.error('Error al activar el objeto:', error);
    res.status(500).json({
        msg: 'Hubo un error al activar el objeto',

    });
}
}

//Activa el usuario de la DBA
export const activateObjeto = async (req: Request, res: Response) => {
   
    const { objeto } = req.body;
    try {
    const _objeto = await Objetos.findOne({
        where: {objeto: objeto}
    });
    if(!_objeto){
        return res.status(404).json({
            msg: "El Objeto no existe: "+ objeto
        });
    }

    await _objeto.update({
        estado_objeto: 1
    }); 
   
    res.json(_objeto);
} catch (error) {
    console.error('Error al inactivar el objeto:', error);
    res.status(500).json({
        msg: 'Hubo un error al inactivar el objeto',

    });
}
}
//Obtiene un objeto de la base de datos     
export const getAllObjetosMenu = async (req: Request, res: Response) => {
    const { tipo_objeto, estado_objeto } = req.body;

    try {
        const _objeto = await Objetos.findAll({
            where: {tipo_objeto: tipo_objeto, estado_objeto: estado_objeto}
        });
        if(_objeto){
            res.json(_objeto)
        }
        else{
            res.status(404).json({
                msg: `el  objeto no existe: ${_objeto}`
            })
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({
            msg: 'Contacte al administrador'
        });
    }
}

export const objetosJSON = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const query = `
        SELECT 
            json_agg(
                json_build_object(
                    'objeto', objeto,
                    'atributes', (
                        SELECT json_agg(
                            json_build_object(
                                'id_objeto', id_objeto,
                                'descripcion', descripcion,
                                'tipo_objeto', tipo_objeto,
                                'url', url,
                                'icono', icono,
                                'creado_por', creado_por,
                                'fecha_creacion', fecha_creacion,
                                'modificado_por', modificado_por,
                                'fecha_modificacion', fecha_modificacion,
                                'estado_objeto', estado_objeto
                            )
                        )
                        FROM mipyme.tbl_ms_objetos as sub
                        WHERE sub.objeto = main.objeto
                    )
                )
            ) AS resultado
        FROM 
            mipyme.tbl_ms_objetos as main
        WHERE estado_objeto = 1
            AND tipo_objeto = 'MANTENIMIENTO'
        GROUP BY 
            objeto
        `;

        const [results, metadata] = await db.query(query);

        res.json(results);
    } catch (error) {
        console.error('Error al consultar productos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};