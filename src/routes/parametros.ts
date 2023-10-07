import {Router} from 'express';
import validarToken from './validarToken';
import { updateParametro, deleteParametro, postParametro, getAllParametros, getParametro } from '../controllers/parametros-controller';

const routerParametros = Router()

routerParametros.get('/getAllParametros', getAllParametros);//Consulta todos los parametros en la base de datos
routerParametros.get('/getParametro', getParametro);//Consulta un parametro en la base de datos
routerParametros.post('/postParametro', postParametro); // inserta un parametro en la base de datos
routerParametros.delete('/deleteParametro', deleteParametro); // elimina un parametro en la base de datos
routerParametros.post('/updateParametro', updateParametro); // actualiza un parametro en la base de datos

export default routerParametros;