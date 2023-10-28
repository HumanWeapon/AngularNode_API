import {Router} from 'express';
import { getAllPymes, getPyme } from '../../controllers/negocio/pyme.controller';
import validarToken from '../validarToken';


const routerPyme = Router()

routerPyme.get('/getAllPymes',validarToken , getAllPymes); // obtiene todos los usuarios
routerPyme.post('/getPyme', getPyme); // obtiene el usuario especificado



export default routerPyme; 