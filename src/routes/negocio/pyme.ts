import {Router} from 'express';
import { activatePyme, deletePyme, getAllPymes, getOnePyme, getPyme, getRolPyme, inactivatePyme, loginPyme, postPyme, pymesAllTipoEmpresa, updatePyme } from '../../controllers/negocio/pyme.controller';
import {validarToken, validarTokenpyme} from '../validarToken';

const routerPyme = Router()

routerPyme.post('/login', loginPyme);//Inicia sesión en la DB
routerPyme.get('/getAllPymes',validarToken , getAllPymes); // obtiene todas las Pymes
routerPyme.post('/getPyme', validarTokenpyme, validarToken, getPyme); // obtiene la Pyme especificada
routerPyme.delete('/deletePyme',validarToken,deletePyme);//Elimina la Pyme de la Base de Datos
routerPyme.post('/updatePyme', validarToken,updatePyme);//Actualiza la Pyme en la Base de Datos
routerPyme.post('/postPyme', validarToken, postPyme);//Inserta un nuevo Pyme en la Base de Datos
routerPyme.post('/inactivatePyme',validarToken, inactivatePyme);//Inactiva una Pyme en la DB
routerPyme.post('/activatePyme',validarToken, activatePyme);//Activa una Pyme en la DB
routerPyme.get('/pymesAllTipoEmpresa',validarTokenpyme, validarToken, pymesAllTipoEmpresa);//Activa un usuario en la DB
routerPyme.get('/getRolPyme',validarTokenpyme, validarToken, getRolPyme);//Obtiene el id del rol PYME
routerPyme.get('/getOnePyme/:id',validarTokenpyme, getOnePyme);//Obtiene la PYME por el nombre

export default routerPyme; 