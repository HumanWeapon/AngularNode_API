import {Router} from 'express';
import {updateUsuario, activateUsuario, inactivateUsuario,  postUsuario, getAllUsuarios, getUsuario, loginUser, cambiarContrasena, usuariosAllRoles, usuariosAllParametros, getCorreoElectronicoPorUsuario, forgotPassword, resetPassword, reestablecer, reestablecerOutlook } from '../controllers/usuario-controller';
import validarToken from './validarToken';

const routerUser = Router()

routerUser.post('/login', loginUser);//Inicia sesión en la DB
routerUser.post('/postUsuario', validarToken, postUsuario);//Inserta un usuario en la DB
routerUser.get('/getAllUsuarios',validarToken , getAllUsuarios); // obtiene todos los usuarios
routerUser.post('/getUsuario', getUsuario); // obtiene el usuario especificado
routerUser.post('/inactivateUsuario',validarToken, inactivateUsuario);//Inactiva un usuario en la DB
routerUser.post('/activateUsuario',validarToken, activateUsuario);//Activa un usuario en la DB
routerUser.post('/updateUsuario', updateUsuario);//Activa un usuario en la DB
routerUser.put('/cambiarContrasena', cambiarContrasena);//Activa un usuario en la DB
routerUser.get('/usuariosAllRoles',validarToken, usuariosAllRoles);//Activa un usuario en la DB
routerUser.post('/usuariosAllParametros',validarToken, usuariosAllParametros);//Activa un usuario en la DB
routerUser.get('/getCorreoElectronicoPorUsuario',getCorreoElectronicoPorUsuario);//Activa un usuario en la DB
routerUser.put('/forgot-password', forgotPassword);//Recuperacion Contraseña por Email envio de correo
routerUser.put('/resetPassword',resetPassword);//Recuperacion Contraseña por Email
routerUser.put('/reestablecer',reestablecer);//Recuperacion Contraseña Predeterminada
routerUser.put('/reestablecerOutlook',reestablecerOutlook);//Recuperacion Contraseña Predeterminada



export default routerUser;