import {Router} from 'express';
import {deleteUsuario, postUsuario, getAllUsuarios, getUsuario, loginUser } from '../controllers/usuario';
import validarToken from './validarToken';

const router = Router()

router.post('/login',validarToken, loginUser);//Inicia sesión en la DB
router.post('/postUsuario', validarToken, postUsuario);//Inserta un usuario en la DB
router.get('/getAllUsuarios', getAllUsuarios); // obtiene todos los usuarios
router.get('/getUsuario', getUsuario); // obtiene el usuario especificado
router.delete('/deleteUsuario', deleteUsuario); // elimina el registro con el usuario especificado

export default router;