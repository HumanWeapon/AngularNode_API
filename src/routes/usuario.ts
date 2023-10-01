import {Router} from 'express';
import {activateUsuario, inactivateUsuario, deleteUsuario, postUsuario, getAllUsuarios, getUsuario, loginUser } from '../controllers/usuario';
import validarToken from './validarToken';

const router = Router()

router.post('/login',validarToken, loginUser);//Inicia sesión en la DB
router.post('/postUsuario', validarToken, postUsuario);//Inserta un usuario en la DB
router.get('/getAllUsuarios', getAllUsuarios); // obtiene todos los usuarios
router.get('/getUsuario', getUsuario); // obtiene el usuario especificado
router.delete('/deleteUsuario', deleteUsuario); // elimina el registro con el usuario especificado
router.post('/inactivateUsuario', inactivateUsuario);//Inactiva un usuario en la DB
router.post('/activateUsuario', activateUsuario);//Activa un usuario en la DB

export default router;