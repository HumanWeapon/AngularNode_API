import {Router} from 'express';
import validarToken from '../validarToken';
import { activateDirecContactos, deleteDirecContactos, getAllDirecContactos, getDirecContactos, inactivateDirecContactos, postDirecContactos, updateDirecContactos } from '../../controllers/negocio/direcciones-controllers';


const routerDireccionContacto = Router()

routerDireccionContacto.get('/getAllDirecContactos',validarToken , getAllDirecContactos); // Obtiene todas las Empresas
routerDireccionContacto.post('/getDirecContactos', getDirecContactos); // Obtiene la Empresa especificada
routerDireccionContacto.post('/postDirecContactos', validarToken,postDirecContactos);//Inserta una nueva Empresa en la Base de Datos
routerDireccionContacto.delete('/deleteDirecContactos',validarToken,deleteDirecContactos);//Elimina la Empresa de la Base de Datos
routerDireccionContacto.post('/updateDirecContactos', validarToken,updateDirecContactos);//Actualiza la Pyme en la Base de Datos
routerDireccionContacto.post('/inactivateDirecContactos',validarToken, inactivateDirecContactos);//Inactiva una Pyme en la DB
routerDireccionContacto.post('/activateDirecContactos',validarToken, activateDirecContactos);//Activa una Pyme en la DB

export default routerDireccionContacto;