import {Router} from 'express';
import { activatePyme, deletePyme, getAllPymes, getOnePyme, getPyme, getRolPyme, inactivatePyme, loginPyme, postPyme, pymesAllTipoEmpresa, updatePyme } from '../../controllers/negocio/pyme.controller';
import {validarToken, validarTokenpyme} from '../validarToken';

const routerPyme = Router()

routerPyme.post('/login', loginPyme);//Inicia sesión en la DB
routerPyme.get('/getAllPymes',validarTokenpyme , getAllPymes); // obtiene todas las Pymes
routerPyme.post('/getPyme', validarTokenpyme, getPyme); // obtiene la Pyme especificada
routerPyme.delete('/deletePyme',validarTokenpyme,deletePyme);//Elimina la Pyme de la Base de Datos
routerPyme.post('/updatePyme', validarTokenpyme,updatePyme);//Actualiza la Pyme en la Base de Datos
routerPyme.post('/postPyme', validarTokenpyme, postPyme);//Inserta un nuevo Pyme en la Base de Datos
routerPyme.post('/inactivatePyme',validarTokenpyme, inactivatePyme);//Inactiva una Pyme en la DB
routerPyme.post('/activatePyme',validarTokenpyme, activatePyme);//Activa una Pyme en la DB
routerPyme.get('/pymesAllTipoEmpresa',validarTokenpyme, pymesAllTipoEmpresa);//Activa un usuario en la DB
routerPyme.get('/getRolPyme', getRolPyme);//Obtiene el id del rol PYME
routerPyme.get('/getOnePyme/:id',validarToken, getOnePyme);//Obtiene la PYME por el nombre

export default routerPyme; 