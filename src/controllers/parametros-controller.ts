import {Request, Response} from 'express';
import { Parametros } from '../models/parametros-models';
import jwt from 'jsonwebtoken';
import { where } from 'sequelize';


//Obtiene todos los parametros de la base de datos
export const getAllParametros = async (req: Request, res: Response) => {

    const _parametro = await Parametros.findAll();
    res.json(_parametro)

}
//Obtiene en los parámetros la cantidad de preguntas para registrar preguntas de seguridad
export const getParametroPreguntasdeSeguridad = async (req: Request, res: Response) => {
    const _parametro = await Parametros.findOne({
        where: {parametro: 'PREGUNTAS_DE_SEGURIDAD'}
    });
    res.json(_parametro)
}

//Obtiene un parametro de la base de datos
export const getParametro = async (req: Request, res: Response) => {
    const { id_parametro } = req.body;
try {
    const _parametro = await Parametros.findOne({
        where: {id_parametro: id_parametro}
    });
    if(_parametro){
        res.json({_parametro})
    }
    else{
        res.status(404).json({
            msg: `el ID del parametro: ${id_parametro} no existe `
        })
    }
} catch (error) {
    res.status(400).json({
        msg: 'Contactate con el administrador',
        error
    }); 
}
}

//Inserta un parametro en la base de datos
export const postParametro = async (req: Request, res: Response) => {

    const { parametro, valor, estado_parametro, fecha_creacion, fecha_modificacion, creado_por, modificado_por  } = req.body;

    try{
        const _parametro = await Parametros.findOne({
            where: {parametro: parametro}
        })
    
        if (_parametro){
            return res.status(400).json({
                msg: 'Parametro ya registrado en la base de datos: '+ parametro
            })
        }else{
            const param = await Parametros.create({
                parametro: parametro.toUpperCase(),
                valor: valor.toUpperCase(),
                estado_parametro: estado_parametro,
                fecha_creacion: fecha_creacion,                
                fecha_modificacion: fecha_modificacion,
                creado_por: creado_por.toUpperCase(),
                modificado_por: modificado_por.toUpperCase(),                
            });

            const _parametro2 = await Parametros.findOne({
                where: {parametro: param.parametro}
            });
            res.json(_parametro2)
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

//Elimina un parametro de la base de datos
export const deleteParametro = async (req: Request, res: Response) => {
    const { id_parametro } = req.body;

    try {
        const _parametro = await Parametros.findOne({
            where: { id_parametro: id_parametro }
        });

        if (_parametro) {
            await _parametro.destroy();
            res.json({
                msg: 'El parámetro con el ID: ' + id_parametro + ' ha sido eliminado exitosamente',
            });
        } else {
            res.status(404).json({
                msg: 'No se encontró un parámetro con el ID: ' + id_parametro,
            });
        }
    } catch (error) {
        console.error('Error al eliminar el parámetro:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el parámetro',
        });
    }
};



//actualiza la pregunta de la base de datos
export const updateParametro = async (req: Request, res: Response) => {
    try {
        const { id_parametro, parametro, valor, estado_parametro, fecha_modificacion, modificado_por  } = req.body;

        const _parametro = await Parametros.findOne({
            where: {id_parametro: id_parametro}
        });
        if(!_parametro){
            return res.status(404).json({
                msg: 'Parametro con el ID: '+ id_parametro +' no existe en la base de datos'
            });
        }
    
        await _parametro.update({
            id_parametro: id_parametro,
            parametro: parametro.toUpperCase(),
            valor: valor.toUpperCase(),
            estado_parametro: estado_parametro,
            fecha_modificacion: fecha_modificacion,
            modificado_por: modificado_por.toUpperCase(),        
        });
        res.json(_parametro);
        
    } catch (error) {
        console.error('Error al actualizar el parámetro:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el parámetro',
        });
    }
}


//Inactiva el parametro de la DBA
    export const inactivateParametro = async (req: Request, res: Response) => {
        try {
            const { parametro } = req.body;
            const _parametro = await Parametros.findOne({
                where: {parametro: parametro}
            });
            if(!_parametro){
                return res.status(404).json({
                    msg: "El Parametro no existe: "+ parametro
                });
            }
        
            await _parametro.update({
                estado_parametro: 2
            });
            res.json(_parametro);
        } catch (error) {
            console.error('Error al inactivar el parámetro:', error);
            res.status(500).json({
                msg: 'Hubo un error al inactivar el parámetro',
            });
        }

}

//Activa el parametro de la DBA
export const activateParametro = async (req: Request, res: Response) => {
    try {
        const { parametro } = req.body;

        const _parametro = await Parametros.findOne({
            where: {parametro: parametro}
        });
        if(!_parametro){
            return res.status(404).json({
                msg: "El Parametro no existe: "+ parametro
            });
        }
    
        await _parametro.update({
            estado_parametro: 1
        });
        res.json(_parametro);
    } catch (error) {
        console.error('Error al activar el parámetro:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar el parámetro',
        });
    }

}
