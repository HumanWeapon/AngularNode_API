import {Router} from 'express';
import { activatePyme, deletePyme, getAllPymes, getOnePyme, getPyme, getRolPyme, inactivatePyme, loginPyme, postPyme, pymesAllTipoEmpresa, updatePyme } from '../controllers/negocio/pyme.controller';
import validarTokenpyme from './validarTokenPyme';


const routerconsultaspyme = Router()

routerconsultaspyme.post('/login', loginPyme);//Inicia sesión en la DB
routerconsultaspyme.get('/getAllPymes',validarTokenpyme , getAllPymes); // obtiene todas las Pymes
routerconsultaspyme.post('/getPyme', validarTokenpyme, getPyme); // obtiene la Pyme especificada
routerconsultaspyme.delete('/deletePyme',validarTokenpyme,deletePyme);//Elimina la Pyme de la Base de Datos
routerconsultaspyme.post('/updatePyme', validarTokenpyme,updatePyme);//Actualiza la Pyme en la Base de Datos
routerconsultaspyme.post('/postPyme', validarTokenpyme, postPyme);//Inserta un nuevo Pyme en la Base de Datos
routerconsultaspyme.post('/inactivatePyme',validarTokenpyme, inactivatePyme);//Inactiva una Pyme en la DB
routerconsultaspyme.post('/activatePyme',validarTokenpyme, activatePyme);//Activa una Pyme en la DB
routerconsultaspyme.get('/pymesAllTipoEmpresa', validarTokenpyme, pymesAllTipoEmpresa);//Activa un usuario en la DB
routerconsultaspyme.get('/getRolPyme', validarTokenpyme, getRolPyme);//Obtiene el id del rol PYME
routerconsultaspyme.get('/getOnePyme/:id',validarTokenpyme, getOnePyme);//Obtiene la PYME por el nombre

export default routerconsultaspyme; 