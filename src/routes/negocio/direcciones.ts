import {Router} from 'express';
import validarToken from '../validarToken';
import { getCiudades, getDireccionesEmoresaporID, getTipoDirecciones, getdirecciones } from '../../controllers/negocio/direcciones-controllers';


const routerDireccionContacto = Router()

routerDireccionContacto.get('/getdirecciones',validarToken , getdirecciones); //Obtiene las direcciones
routerDireccionContacto.get('/getTipoDirecciones',validarToken , getTipoDirecciones); //Obtiene todos los tipo de dirección activos
routerDireccionContacto.get('/getCiudades',validarToken , getCiudades); //Obtiene todos los tipo de dirección activos
routerDireccionContacto.get('/getDireccionesEmoresaporID/:id',validarToken , getDireccionesEmoresaporID); //Obtiene todos los tipo de dirección activos




export default routerDireccionContacto;