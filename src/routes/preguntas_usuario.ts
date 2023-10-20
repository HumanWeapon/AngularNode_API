import {Router} from 'express';
import validarToken from './validarToken';
import { updatePreguntaUsuario, getAllPreguntasUsuario, getPreguntasusuario, postPreguntaUsuario, validarRespuestas, preguntasRespuestas } from '../controllers/preguntas_usuario-controller';

const routerPreguntasUsuario = Router()

routerPreguntasUsuario.get('/getAllPreguntasUsuario',validarToken, getAllPreguntasUsuario);//Inicia sesión en la DB
routerPreguntasUsuario.post('/getPreguntasusuario',validarToken, getPreguntasusuario);//Inserta un usuario en la DB
routerPreguntasUsuario.post('/postPreguntaUsuario',validarToken, postPreguntaUsuario); // obtiene todos los usuarios
routerPreguntasUsuario.put('/updatePreguntaUsuario',validarToken, updatePreguntaUsuario); // Actualiza las preguntas por el usuario seleccionado
routerPreguntasUsuario.post('/validarRespuestas',validarToken, validarRespuestas);//Inserta un usuario en la DB
routerPreguntasUsuario.post('/preguntasRespuestas',validarToken, preguntasRespuestas);//


export default routerPreguntasUsuario;