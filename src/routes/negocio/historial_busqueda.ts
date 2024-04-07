import {Router} from 'express';
import validarToken from '.././validarToken';
import { activateHistorialB, deleteHistorialB, getAllHistorialB, getHistorialB, inactivateHistorialB, postHistorialB, updateHistorialB } from '../../controllers/negocio/historial_busqueda';


const routerHistB = Router()

routerHistB.get('/getAllHistorialB',validarToken, getAllHistorialB);//Consulta todos los parametros en la base de datos
routerHistB.post('/getHistorialB',validarToken, getHistorialB);//Consulta solo un elemento en la base de datos
routerHistB.post('/postHistorialB', validarToken, postHistorialB);//Inserta una nuevo Pais en la Base de Datos
routerHistB.delete('/deleteHistorialB',validarToken, deleteHistorialB);//Elimina el Pais de la Base de Datos
routerHistB.post('/updateHistorialB', validarToken, updateHistorialB);//Actualiza el Pais en la Base de Datos
routerHistB.post('/inactivateHistorialB',validarToken, inactivateHistorialB);//Inactiva un Pais en la DB
routerHistB.post('/activateHistorialB',validarToken, activateHistorialB);//Activa un Pais en la DB

export default routerHistB;