import {Router} from 'express';
import validarToken from './validarToken';
import { deletePermiso, getAllPermisos, getPermiso, postPermiso, updatePermisos } from '../controllers/permisos-controller';

const routerPermisos = Router()

routerPermisos.get('/getAllPermisos',validarToken, getAllPermisos);//Muestra todos los Permisos registrados en la base de datos
routerPermisos.get('/getPermiso',validarToken, getPermiso);//Muestra un Permiso seleccionado
routerPermisos.post('/postPermiso',validarToken, postPermiso); // Inserta Permisos en la base de datos
routerPermisos.delete('/deletePermiso',validarToken, deletePermiso); // Elimina Permiso en la base de datos
routerPermisos.post('/updatePermisos',validarToken, updatePermisos); // actualiza permiso en la base de datos

export default routerPermisos;