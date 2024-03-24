import {Router} from 'express';
import validarToken from '../validarToken';
import { activateTipoDireccion, getCiudades, getDireccionesEmpresaporID, getTipoDirecciones, getdirecciones, inactivateTipoDireccion } from '../../controllers/negocio/direcciones-controllers';


const routerDireccionContacto = Router()

routerDireccionContacto.get('/getdirecciones',validarToken , getdirecciones); //Obtiene las direcciones
routerDireccionContacto.get('/getTipoDirecciones',validarToken , getTipoDirecciones); //Obtiene todos los tipo de dirección activos
routerDireccionContacto.get('/getCiudades',validarToken , getCiudades); //Obtiene todos los tipo de dirección activos
routerDireccionContacto.get('/getDireccionesEmpresaporID/:id',validarToken , getDireccionesEmpresaporID); //Obtiene las direcciones registradas por empresa
routerDireccionContacto.post('/inactivateTipoDireccion',validarToken , inactivateTipoDireccion); //inactiva las direcciones de la dba
routerDireccionContacto.post('/activateTipoDireccion',validarToken , activateTipoDireccion); //activa las direcciones de la dba



export default routerDireccionContacto;