import {Router} from 'express';
import validarToken from './validarToken';
import { updatePreguntaUsuario, getAllPreguntasUsuario, getPreguntasusuario, postPreguntaUsuario, validarRespuestas, preguntasRespuestas, activatePreguntaUsuario, inactivatePreguntaUsuario } from '../controllers/preguntas_usuario-controller';

const routerPreguntasUsuario = Router()

routerPreguntasUsuario.get('/getAllPreguntasUsuario',validarToken, getAllPreguntasUsuario);//Inicia sesión en la DB
routerPreguntasUsuario.post('/getPreguntasusuario',validarToken, getPreguntasusuario);//Inserta un usuario en la DB
routerPreguntasUsuario.post('/postPreguntaUsuario', postPreguntaUsuario); // obtiene todos los usuarios
routerPreguntasUsuario.post('/updatePreguntaUsuario',validarToken, updatePreguntaUsuario); // Actualiza las preguntas por el usuario seleccionado
routerPreguntasUsuario.post('/validarRespuestas', validarRespuestas);//Inserta un usuario en la DB
routerPreguntasUsuario.post('/preguntasRespuestas', preguntasRespuestas);//
routerPreguntasUsuario.post('/activatePreguntaUsuario', activatePreguntaUsuario); // elimina el registro con el usuario especificado
routerPreguntasUsuario.post('/inactivatePreguntaUsuario', inactivatePreguntaUsuario); // elimina el registro con el usuario especificado

export default routerPreguntasUsuario;