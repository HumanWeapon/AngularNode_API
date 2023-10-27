import {Router} from 'express';
import validarToken from './validarToken';
import { updatePregunta, deletePregunta, postPregunta, getAllPreguntas, getPregunta } from '../controllers/preguntas-controller';

const routerPreguntas = Router()

routerPreguntas.get('/getAllPreguntas', getAllPreguntas);//Inicia sesión en la DB
routerPreguntas.get('/getPregunta',validarToken, getPregunta);//Inserta un usuario en la DB
routerPreguntas.post('/postPregunta',validarToken, postPregunta); // obtiene todos los usuarios
routerPreguntas.delete('/deletePregunta',validarToken, deletePregunta); // obtiene el usuario especificado
routerPreguntas.post('/updatePregunta',validarToken, updatePregunta); // elimina el registro con el usuario especificado

export default routerPreguntas;