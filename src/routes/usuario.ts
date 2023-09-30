import {Router} from 'express';
import {postUsuario, getAllUsuarios, getUsuario, loginUser } from '../controllers/usuario';
import validarToken from './validarToken';

const router = Router()

router.post('/login',validarToken, loginUser);//Inicia sesión en la DB
router.post('/postUsuario', validarToken, postUsuario);//Inserta un usuario en la DB
router.get('/getAllUsuarios', getAllUsuarios); // obtiene todos los usuarios
router.get('/getAusuario', getUsuario); // obtiene el usuario especificado


export default router;