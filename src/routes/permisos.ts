import {Router} from 'express';
import validarToken from './validarToken';
import { deletePermiso, getAllPermisos, getPermiso, postPermiso, updatePermisos } from '../controllers/permisos-controller';

const routerPermisos = Router()

routerPermisos.get('/getAllPermisos', getAllPermisos);//Muestra todos los Permisos registrados en la base de datos
routerPermisos.get('/getPermiso', getPermiso);//Muestra un Permiso seleccionado
routerPermisos.post('/postPermiso', postPermiso); // Inserta Permisos en la base de datos
routerPermisos.delete('/deletePermiso', deletePermiso); // Elimina Permiso en la base de datos
routerPermisos.post('/updatePermisos', updatePermisos); // actualiza permiso en la base de datos

export default routerPermisos;