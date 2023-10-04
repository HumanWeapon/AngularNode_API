import {Router} from 'express';
import validarToken from './validarToken';
import { updateParametro, deleteParametro, postParametro, getAllParametros, getParametro } from '../controllers/parametros-controller';

const routerParametros = Router()

routerParametros.get('/getAllParametros', getAllParametros);//Inicia sesión en la DB
routerParametros.get('/getParametro', getParametro);//Inserta un usuario en la DB
routerParametros.post('/postParametro', postParametro); // obtiene todos los usuarios
routerParametros.delete('/deleteParametro', deleteParametro); // obtiene el usuario especificado
routerParametros.post('/updateParametro', updateParametro); // elimina el registro con el usuario especificado

export default routerParametros;