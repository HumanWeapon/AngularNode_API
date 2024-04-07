import {Router} from 'express';
import validarToken from '.././validarToken';
import { getAllHistorialB, gethistorial_busqueda_PYME, postHistorialB } from '../../controllers/negocio/historial_busqueda';


const routerHistB = Router()

routerHistB.get('/getAllHistorialB',validarToken, getAllHistorialB);//Consulta todos los registros del historial de búsqueda
routerHistB.get('/gethistorial_busqueda_PYME/:id_pyme',validarToken, gethistorial_busqueda_PYME);//Consulta todos los registros del historial de búsqueda para una PYME por el id_pyme
routerHistB.post('/postHistorialB', validarToken, postHistorialB);//Inserta una nuevo registro en la Base de Datos

export default routerHistB;