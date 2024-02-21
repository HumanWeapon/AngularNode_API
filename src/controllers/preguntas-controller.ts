import {Request, Response} from 'express';
import { Preguntas } from '../models/preguntas-model';
import jwt from 'jsonwebtoken';


//Obtiene todas las preguntas de la base de datos
export const getAllPreguntas = async (req: Request, res: Response) => {

    const _pregunta = await Preguntas.findAll();
    res.json(_pregunta)

}

//Obtiene una pregunta de la base de datos
export const getPregunta = async (req: Request, res: Response) => {
    const { id_pregunta } = req.body;

    const _pregunta = await Preguntas.findOne({
        where: {id_pregunta: id_pregunta}
    });
    if(_pregunta){
        res.json(_pregunta)
    }
    else{
        res.status(404).json({
            msg: `el ID de la pregunta no existe: ${id_pregunta}`
        })
    }
}

//Inserta una pregunta en la base de datos
export const postPregunta = async (req: Request, res: Response) => {

    const { pregunta, estado_pregunta, creado_por, fecha_creacion, modificado_por, fecha_modificacion  } = req.body;

    try{
        const _Pregunta = await Preguntas.findOne({
            where: {pregunta: pregunta}
        })
    
        if (_Pregunta){
            return res.status(400).json({
                msg: 'Pregunta ya registrada en la base de datos: '+ pregunta
            })
        }else{
            const newQuestion = await Preguntas.create({
                pregunta: pregunta.toUpperCase(),
                estado_pregunta: estado_pregunta,
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion
            })
            res.json(newQuestion)
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

//Elimina la pregunta de la base de datos



export const deletePregunta = async (req: Request, res: Response) => {
    const { id_pregunta } = req.body;

    try {
        const _pregunta = await Preguntas.findOne({
            where: { id_pregunta : id_pregunta }
        });

        if (_pregunta) {
            await _pregunta.destroy();
            res.json(_pregunta);
        } else {
            res.status(404).json({
                msg: 'No se encontró ninguna pregunta con el ID: ' + id_pregunta,
            });
        }
    } catch (error) {
        console.error('Error al eliminar la pregunta:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la pregunta',
        });
    }
};


//actualiza la pregunta de la base de datos
export const updatePregunta = async (req: Request, res: Response) => {
 
    const { id_pregunta, pregunta, estado_pregunta, modificado_por, fecha_modificacion  } = req.body;
    try {
    const _pregunta = await Preguntas.findOne({
        where: {id_pregunta: id_pregunta}
    });
    if(!_pregunta){
        return res.status(404).json({
            msg: 'Pregunta con el ID: '+ id_pregunta +' no existe en la base de datos'
        });
    }

    await _pregunta.update({
        id_pregunta: id_pregunta,
        pregunta: pregunta.toUpperCase(),
        estado_pregunta: estado_pregunta,
        modificado_por: modificado_por.toUpperCase(),
        fecha_modificacion: fecha_modificacion
    });
    res.json(_pregunta);

} catch (error) {
    console.error('Error al actualizar la pregunta:', error);
    res.status(500).json({
        msg: 'Hubo un error al actualizar la pregunta',
    });
}

}

//Inactiva la pregunta de la DBA
export const inactivatePregunta = async (req: Request, res: Response) => {
  
    const { pregunta } = req.body;
    try {
    const _pregunta = await Preguntas.findOne({
        where: {pregunta: pregunta}
    });
    if(!_pregunta){
        return res.status(404).json({
            msg: "La pregunta no existe: "+ pregunta
        });
    }

    await _pregunta.update({
        estado_pregunta: 2
    });
    res.json(_pregunta);

} catch (error) {
    console.error('Error al Inactivar la pregunta:', error);
    res.status(500).json({
        msg: 'Hubo un error al Inactivar la pregunta',
    });
}
}


//Activa la pregunta de la DBA
export const activatePregunta = async (req: Request, res: Response) => {
   
    const { pregunta } = req.body;
    try {
    const _pregunta = await Preguntas.findOne({
        where: {pregunta: pregunta}
    });
    if(!_pregunta){
        return res.status(404).json({
            msg: "La Pregunta no existe: "+ pregunta
        });
    }

    await _pregunta.update({
        estado_pregunta: 1
    });
    res.json(_pregunta);

} catch (error) {
    console.error('Error al activar la pregunta:', error);
    res.status(500).json({
        msg: 'Hubo un error al activar la pregunta',
    });
}

}