import {Router} from 'express';
import { deletePyme, getAllPymes, getPyme, postPyme, updatePyme } from '../../controllers/negocio/pyme.controller';
import validarToken from '../validarToken';


const routerPyme = Router()

routerPyme.get('/getAllPymes',validarToken , getAllPymes); // obtiene todas las Pymes
routerPyme.post('/getPyme', getPyme); // obtiene la Pyme especificada
routerPyme.delete('/deletePyme',validarToken,deletePyme);//Elimina la Pyme de la Base de Datos
routerPyme.post('/updatePyme', validarToken,updatePyme);//Actualiza la Pyme en la Base de Datos
routerPyme.post('/postPyme', validarToken,postPyme);//Inserta un nuevo Pyme en la Base de Datos


export default routerPyme; 