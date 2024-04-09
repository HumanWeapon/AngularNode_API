import {Router} from 'express';
import {validarToken} from './validarToken';
import { activateRol, deleteRol, getAllRoles, getRol, inactivateRol, postRol, updateRoles } from '../controllers/roles-controller';

const routerRoles = Router()

routerRoles.get('/getAllRoles',validarToken, getAllRoles);//Muestra todos los Roles registrados en la base de datos
routerRoles.get('/getRol',validarToken, getRol);//Muestra un Rol seleccionado
routerRoles.post('/postRol',validarToken, postRol); // Inserta Roles en la base de datos
routerRoles.delete('/deleteRol',validarToken, deleteRol); // Elimina Rol en la base de datos
routerRoles.post('/updateRoles',validarToken, updateRoles); // actualiza rol en la base de datos
routerRoles.post('/inactivateRol',validarToken, inactivateRol);//Inactiva una Pyme en la DB
routerRoles.post('/activateRol',validarToken, activateRol);//Activa una Pyme en la DB

export default routerRoles;