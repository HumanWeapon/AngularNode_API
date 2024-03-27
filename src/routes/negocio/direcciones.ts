import {Router} from 'express';
import validarToken from '../validarToken';
import { activateDireccion, getCiudades, getDireccionesEmpresaporID, getTipoDirecciones, getdirecciones, inactivateDirecion, postDireccion } from '../../controllers/negocio/direcciones-controllers';


const routerDireccionContacto = Router()

routerDireccionContacto.get('/getdirecciones',validarToken , getdirecciones); //Obtiene las direcciones
routerDireccionContacto.get('/getTipoDirecciones',validarToken , getTipoDirecciones); //Obtiene todos los tipo de dirección activos
routerDireccionContacto.get('/getCiudades',validarToken , getCiudades); //Obtiene todos los tipo de dirección activos
routerDireccionContacto.get('/getDireccionesEmpresaporID/:id',validarToken , getDireccionesEmpresaporID); //Obtiene las direcciones registradas por empresa
routerDireccionContacto.post('/inactivateDirecion',validarToken , inactivateDirecion); //inactiva las direcciones de la dba
routerDireccionContacto.post('/activateDireccion',validarToken , activateDireccion); //activa las direcciones de la dba
routerDireccionContacto.post('/postDireccion',validarToken , postDireccion); // Inserta una nueva dirección en la DBA


export default routerDireccionContacto;