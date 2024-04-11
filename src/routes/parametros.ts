import {Router} from 'express';
import validarToken from './validarToken';
import { updateParametro, deleteParametro, postParametro, getAllParametros, getParametro, inactivateParametro, activateParametro, getParametroPreguntasdeSeguridad } from '../controllers/parametros-controller';

const routerParametros = Router()

routerParametros.get('/getAllParametros',validarToken, getAllParametros);//Consulta todos los parametros en la base de datos
routerParametros.get('/getParametroPreguntasdeSeguridad', getParametroPreguntasdeSeguridad);//Obtiene en los parámetros la cantidad de preguntas para registrar preguntas de seguridad
routerParametros.get('/getParametro',validarToken, getParametro);//Consulta un parametro en la base de datos
routerParametros.post('/postParametro',validarToken, postParametro); // inserta un parametro en la base de datos
routerParametros.delete('/deleteParametro',validarToken, deleteParametro); // elimina un parametro en la base de datos
routerParametros.post('/updateParametro',validarToken, updateParametro); // actualiza un parametro en la base de datos
routerParametros.post('/inactivateParametro',validarToken, inactivateParametro);
routerParametros.post('/activateParametro',validarToken, activateParametro);
export default routerParametros;