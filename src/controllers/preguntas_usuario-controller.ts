import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { PreguntasUsuario } from "../models/preguntas_usuario-model";


//Obtiene todas las preguntas de los usuarios en la base de datos
export const getAllPreguntasUsuario = async (req: Request, res: Response) => {
    const _pregunta = await PreguntasUsuario.findAll();
    res.json({_pregunta})
}

//Obtiene todas las preguntas de un usuario
export const getPreguntasusuario = async (req: Request, res: Response) => {
    const { id_usuario } = req.body;
    try {
        const _pregunta = await PreguntasUsuario.findAll({
            where: {id_usuario: id_usuario}
        })

        if(_pregunta){
            res.json({_pregunta})
        }
        else{
            res.status(404).json({
                msg: `No existen preguntas para este usuario`
            })
        }
    } catch (error) {
        console.log(error)
    }
}

//Inserta una respuesta en la base de datos
export const postPreguntaUsuario = async (req: Request, res: Response) => {

    const { id_pregunta, id_usuario, respuesta, creado_por, fecha_creacion, modificado_por, fecha_modificacion  } = req.body;
    const hashedresponse = await bcrypt.hash(respuesta, 10);

    try{
        const _pregunta = await PreguntasUsuario.findAndCountAll({
            where: {id_usuario: id_usuario}
        })
    
        if (_pregunta.count >= 3){
            return res.status(400).json({
                msg: 'Has alcanzado el límite de preguntas para el usuario con el ID: '+ id_usuario
            })
        }
        else{
            const _respuesta = await PreguntasUsuario.findOne({
                where: {id_usuario: id_usuario, id_pregunta: id_pregunta}
            });

            if(_respuesta){
                return res.status(400).json({
                    msg: 'Ya has registrado esta pregunta previamente con el ID: '+ id_pregunta
                })
            }else{
                await PreguntasUsuario.create({
                    id_pregunta: id_pregunta,
                    id_usuario: id_usuario,
                    respuesta: hashedresponse,
                    creado_por: creado_por,
                    fecha_creacion: fecha_creacion,
                    modificado_por: modificado_por, 
                    fecha_modificacion: fecha_modificacion
                })
                res.json({
                    msg: 'La respuesta para la pregunta con ID: '+ id_pregunta+ ' ha sido registrada exitosamente',
                })
            }

        }
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}

//Actualiza una pregunta en la base de datos
export const updatePreguntaUsuario = async (req: Request, res: Response) => {

    const { id_pregunta, id_usuario, respuesta, modificado_por, fecha_modificacion  } = req.body;

    const hashedresponse = await bcrypt.hash(respuesta, 10);

    try{
        const _respuesta = await PreguntasUsuario.findOne({
            where: {id_usuario: id_usuario, id_pregunta: id_pregunta}
        });

        if(_respuesta){

            await _respuesta.update({
                id_pregunta: id_pregunta,
                id_usuario: id_usuario,
                respuesta: hashedresponse,
                modificado_por: modificado_por, 
                fecha_modificacion: fecha_modificacion
            })
            res.json({
                msg: 'La respuesta para la pregunta con ID: '+ id_pregunta+ ' ha sido actualizada exitosamente',
            })
        }else{
            return res.status(400).json({
                msg: 'El usuario no tiene registrada la pregunta con el ID: '+ id_pregunta
            })
        }

    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}