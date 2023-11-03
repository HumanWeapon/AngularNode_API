import {Router} from 'express';
import { activatePyme, deletePyme, getAllPymes, getPyme, inactivatePyme, postPyme, pymesAllTipoEmpresa, updatePyme } from '../../controllers/negocio/pyme.controller';
import validarToken from '../validarToken';


const routerPyme = Router()

routerPyme.get('/getAllPymes',validarToken , getAllPymes); // obtiene todas las Pymes
routerPyme.post('/getPyme', getPyme); // obtiene la Pyme especificada
routerPyme.delete('/deletePyme',validarToken,deletePyme);//Elimina la Pyme de la Base de Datos
routerPyme.post('/updatePyme', validarToken,updatePyme);//Actualiza la Pyme en la Base de Datos
routerPyme.post('/postPyme', validarToken,postPyme);//Inserta un nuevo Pyme en la Base de Datos
routerPyme.post('/inactivatePyme',validarToken, inactivatePyme);//Inactiva una Pyme en la DB
routerPyme.post('/activatePyme',validarToken, activatePyme);//Activa una Pyme en la DB
routerPyme.get('/pymesAllTipoEmpresa',validarToken, pymesAllTipoEmpresa);//Activa un usuario en la DB

export default routerPyme; 