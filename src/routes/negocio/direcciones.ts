import {Router} from 'express';
import validarToken from '../validarToken';
import { getdirecciones } from '../../controllers/negocio/direcciones-controllers';


const routerDireccionContacto = Router()

routerDireccionContacto.get('/getdirecciones',validarToken , getdirecciones); // Obtiene todas las Empresas

export default routerDireccionContacto;