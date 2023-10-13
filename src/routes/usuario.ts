import {Router} from 'express';
import {updateUsuario, activateUsuario, inactivateUsuario, deleteUsuario, postUsuario, getAllUsuarios, getUsuario, loginUser } from '../controllers/usuario-controller';
import validarToken from './validarToken';

const routerUser = Router()

routerUser.post('/login',validarToken, loginUser);//Inicia sesión en la DB
routerUser.post('/postUsuario', validarToken, postUsuario);//Inserta un usuario en la DB
routerUser.get('/getAllUsuarios', getAllUsuarios); // obtiene todos los usuarios
routerUser.post('/getUsuario', getUsuario); // obtiene el usuario especificado
routerUser.delete('/deleteUsuario', deleteUsuario); // elimina el registro con el usuario especificado
routerUser.post('/inactivateUsuario', inactivateUsuario);//Inactiva un usuario en la DB
routerUser.post('/activateUsuario', activateUsuario);//Activa un usuario en la DB
routerUser.post('/updateUsuario', updateUsuario);//Activa un usuario en la DB

export default routerUser;