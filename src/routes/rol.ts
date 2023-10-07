import {Router} from 'express';
import validarToken from './validarToken';
import { deleteRol, getAllRoles, getRol, postRol, updateRoles } from '../controllers/roles-controller';

const routerRoles = Router()

routerRoles.get('/getAllRoles', getAllRoles);//Muestra todos los Roles registrados en la base de datos
routerRoles.get('/getRol', getRol);//Muestra un Rol seleccionado
routerRoles.post('/postRol', postRol); // Inserta Roles en la base de datos
routerRoles.delete('/deleteRol', deleteRol); // Elimina Rol en la base de datos
routerRoles.post('/updateRoles', updateRoles); // actualiza rol en la base de datos

export default routerRoles;