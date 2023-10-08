import {Router} from 'express';
import validarToken from './validarToken';
import { updatePreguntaUsuario, getAllPreguntasUsuario, getPreguntasusuario, postPreguntaUsuario, validarRespuestas } from '../controllers/preguntas_usuario-controller';

const routerPreguntasUsuario = Router()

routerPreguntasUsuario.get('/getAllPreguntasUsuario', getAllPreguntasUsuario);//Inicia sesión en la DB
routerPreguntasUsuario.post('/getPreguntasusuario', getPreguntasusuario);//Inserta un usuario en la DB
routerPreguntasUsuario.post('/postPreguntaUsuario', postPreguntaUsuario); // obtiene todos los usuarios
routerPreguntasUsuario.put('/updatePreguntaUsuario', updatePreguntaUsuario); // Actualiza las preguntas por el usuario seleccionado
routerPreguntasUsuario.post('/validarRespuestas', validarRespuestas);//Inserta un usuario en la DB

export default routerPreguntasUsuario;