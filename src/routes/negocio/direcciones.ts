import {Router} from 'express';
import validarToken from '../validarToken';
import { getCiudades, getDireccionesEmpresaporID, getTipoDirecciones, getdirecciones } from '../../controllers/negocio/direcciones-controllers';


const routerDireccionContacto = Router()

routerDireccionContacto.get('/getdirecciones',validarToken , getdirecciones); //Obtiene las direcciones
routerDireccionContacto.get('/getTipoDirecciones',validarToken , getTipoDirecciones); //Obtiene todos los tipo de dirección activos
routerDireccionContacto.get('/getCiudades',validarToken , getCiudades); //Obtiene todos los tipo de dirección activos
routerDireccionContacto.get('/getDireccionesEmpresaporID/:id',validarToken , getDireccionesEmpresaporID); //Obtiene todos los tipo de dirección activos




export default routerDireccionContacto;