import {Request, Response} from 'express';
import { Objetos } from '../../models/objetos-models';
import { Paises } from '../../models/negocio/paises-models';
import { where } from 'sequelize';

//Obtiene todos los objetos de la base de datos
export const getAllPaises = async (req: Request, res: Response) => {
    try {
        const paises = await Paises.findAll();
        res.json(paises)
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}

//Obtiene un Pais por ID
export const getPais = async (req: Request, res: Response) => {
    const { id_pais } = req.body;

    const _pais = await Paises.findAll({
        where: {id_pais: id_pais}
    });
    if(_pais){
        res.json(_pais)
    }
    else{
        res.status(404).json({
            msg: `el ID del Pais no existe: ${id_pais}`
        })
    }
}

// Inserta una nueva Empresa en la base de datos
export const postPais = async (req: Request, res: Response) => {

    const {  pais, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado} = req.body;

    try{
        const _pais = await Paises.findOne({
            where: {pais: pais}
        })
    
            const paises = await Paises.create({
                pais: pais,
                descripcion: descripcion, 
                creado_por: creado_por,
                fecha_creacion: Date.now(),
                modificado_por: modificado_por,
                fecha_modificacion: Date.now(),
                estado: estado
            })
            res.json(paises)
        //hola
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}

// Elimina el Pais de la base de datos
export const deletePais = async (req: Request, res: Response) => {
    const { id_pais } = req.body; // Obtén el ID desde los parámetros de la URL

    try {
        const _pais = await Paises.findOne({
            where: { id_pais: id_pais}
        });

        if (_pais) {
            await _pais.destroy();
            res.json(_pais);
        } else {
            res.status(404).json({
                msg: 'No se encontró un Pais con el ID ' + id_pais,
            });
        }
    } catch (error) {
        console.error('Error al eliminar el Pais:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el Pais',
        });
    }
};

//actualiza el Telefono en la base de datos
export const updatePais = async (req: Request, res: Response) => {
   
    const { id_pais, pais, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado} = req.body;
    try {
    const _pais = await Paises.findOne({
        where: {id_pais: id_pais}
    });
    if(!_pais){
        return res.status(404).json({
            msg: 'Pais con el ID: '+ id_pais +' no existe en la base de datos'
        });
    }

    await _pais.update({

        id_pais: id_pais,
        pais: pais,
        descripcion: descripcion, 
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
        
    });
    res.json(_pais);

} catch (error) {
    console.error('Error al actualizar el pais:', error);
    res.status(500).json({
        msg: 'Hubo un error al actualizar el pais',
    });
}
}

//Inactiva el usuario de la DBA
export const inactivatePais = async (req: Request, res: Response) => {
    
    const { pais } = req.body;
    try {
    const paises = await Paises.findOne({
        where: {pais: pais}
    });
    if(!paises){
        return res.status(404).json({
            msg: "El Pais no existe: "+ pais
        });
    }

    await paises.update({
        estado: 2
    });
    res.json(paises);

} catch (error) {
    console.error('Error al inactivar el pais:', error);
    res.status(500).json({
        msg: 'Hubo un error al inactivar el pais',
    });
}
}

//Activa el usuario de la DBA
export const activatePais = async (req: Request, res: Response) => {
    
    const { pais } = req.body;
    try {
    const paises = await Paises.findOne({
        where: {pais: pais}
    });
    if(!paises){
        return res.status(404).json({
            msg: "El Pais no existe: "+ pais
        });
    }

    await paises.update({
        estado: 1
    });
    res.json(paises);

} catch (error) {
    console.error('Error al activar el pais:', error);
    res.status(500).json({
        msg: 'Hubo un error al activar el pais',
    });
}
}