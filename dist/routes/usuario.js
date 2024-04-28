"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario-controller");
const validarToken_1 = __importDefault(require("./validarToken"));
const routerUser = (0, express_1.Router)();
routerUser.post('/login', usuario_controller_1.loginUser); //Inicia sesión en la DB
routerUser.post('/postUsuario', validarToken_1.default, usuario_controller_1.postUsuario); //Inserta un usuario en la DB
routerUser.get('/getAllUsuarios', validarToken_1.default, usuario_controller_1.getAllUsuarios); // obtiene todos los usuarios
routerUser.post('/getUsuario', usuario_controller_1.getUsuario); // obtiene el usuario especificado
routerUser.post('/inactivateUsuario', validarToken_1.default, usuario_controller_1.inactivateUsuario); //Inactiva un usuario en la DB
routerUser.post('/activateUsuario', validarToken_1.default, usuario_controller_1.activateUsuario); //Activa un usuario en la DB
routerUser.post('/updateUsuario', usuario_controller_1.updateUsuario); //Activa un usuario en la DB
routerUser.put('/cambiarContrasena', usuario_controller_1.cambiarContrasena); //Activa un usuario en la DB
routerUser.get('/usuariosAllRoles', validarToken_1.default, usuario_controller_1.usuariosAllRoles); //Activa un usuario en la DB
routerUser.post('/usuariosAllParametros', validarToken_1.default, usuario_controller_1.usuariosAllParametros); //Activa un usuario en la DB
routerUser.get('/getCorreoElectronicoPorUsuario', usuario_controller_1.getCorreoElectronicoPorUsuario); //Activa un usuario en la DB
routerUser.put('/forgot-password', usuario_controller_1.forgotPassword); //Recuperacion Contraseña por Email envio de correo
routerUser.put('/resetPassword', usuario_controller_1.resetPassword); //Recuperacion Contraseña por Email
routerUser.put('/reestablecer', usuario_controller_1.reestablecer); //Recuperacion Contraseña Predeterminada
routerUser.put('/reestablecerOutlook', usuario_controller_1.reestablecerOutlook); //Recuperacion Contraseña Predeterminada
exports.default = routerUser;
