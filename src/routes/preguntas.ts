import {Router} from 'express';
import validarToken from './validarToken';
import { updatePregunta, deletePregunta, postPregunta, getAllPreguntas, getPregunta, activatePregunta, inactivatePregunta } from '../controllers/preguntas-controller';

const routerPreguntas = Router()

routerPreguntas.get('/getAllPreguntas', getAllPreguntas);//Inicia sesión en la DB
routerPreguntas.get('/getPregunta', getPregunta);//Inserta un usuario en la DB
routerPreguntas.post('/postPregunta', postPregunta); // obtiene todos los usuarios
routerPreguntas.delete('/deletePregunta', deletePregunta); // obtiene el usuario especificado
routerPreguntas.post('/updatePregunta', updatePregunta); // elimina el registro con el usuario especificado
routerPreguntas.post('/activatePregunta', activatePregunta); // elimina el registro con el usuario especificado
routerPreguntas.post('/inactivatePregunta', inactivatePregunta); // elimina el registro con el usuario especificado
export default routerPreguntas;