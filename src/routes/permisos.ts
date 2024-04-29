import {Router} from 'express';
import validarToken from './validarToken';
import { activatePermiso, deletePermiso, getAllPermisos, getPermiso, getPermnisosObjetos, inactivatePermiso, objetosSinRol, objetosSinRolV2, permisosRolesObjetos, permisosdeRoutes, postPermiso, updatePermisos } from '../controllers/permisos-controller';

const routerPermisos = Router()

routerPermisos.get('/getAllPermisos',validarToken, getAllPermisos);//Muestra todos los Permisos registrados en la base de datos
routerPermisos.get('/objetosSinRol/:id',validarToken, objetosSinRol);//Muestra todos los Permisos registrados en la base de datos
routerPermisos.get('/objetosSinRolV2/:id',validarToken, objetosSinRolV2);//Muestra todos los Permisos registrados en la base de datos
routerPermisos.get('/permisosdeRoutes/:id_rol/:id_objeto/:id_usuario',validarToken, permisosdeRoutes);//Muestra todos los Permisos registrados en la base de datos
routerPermisos.get('/getPermiso',validarToken, getPermiso);//Muestra un Permiso seleccionado
routerPermisos.post('/postPermiso',validarToken, postPermiso); // Inserta Permisos en la base de datos
routerPermisos.delete('/deletePermiso',validarToken, deletePermiso); // Elimina Permiso en la base de datos
routerPermisos.post('/updatePermisos',validarToken, updatePermisos); // actualiza permiso en la base de datos
routerPermisos.post('/inactivatePermiso',validarToken, inactivatePermiso);//Inactiva una Pyme en la DB
routerPermisos.post('/activatePermiso',validarToken, activatePermiso);//Activa una Pyme en la DB
routerPermisos.post('/permisosRolesObjetos',validarToken, permisosRolesObjetos);//Activa una Pyme en la DB
routerPermisos.get('/getPermnisosObjetos/:id_rol/:id_objeto',validarToken, getPermnisosObjetos);//Activa una Pyme en la DB


export default routerPermisos;
