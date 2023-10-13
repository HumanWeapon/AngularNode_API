"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario-controller");
const validarToken_1 = __importDefault(require("./validarToken"));
const routerUser = (0, express_1.Router)();
routerUser.post('/login', validarToken_1.default, usuario_controller_1.loginUser); //Inicia sesión en la DB
routerUser.post('/postUsuario', validarToken_1.default, usuario_controller_1.postUsuario); //Inserta un usuario en la DB
routerUser.get('/getAllUsuarios', usuario_controller_1.getAllUsuarios); // obtiene todos los usuarios
routerUser.post('/getUsuario', usuario_controller_1.getUsuario); // obtiene el usuario especificado
routerUser.delete('/deleteUsuario', usuario_controller_1.deleteUsuario); // elimina el registro con el usuario especificado
routerUser.post('/inactivateUsuario', usuario_controller_1.inactivateUsuario); //Inactiva un usuario en la DB
routerUser.post('/activateUsuario', usuario_controller_1.activateUsuario); //Activa un usuario en la DB
routerUser.post('/updateUsuario', usuario_controller_1.updateUsuario); //Activa un usuario en la DB
exports.default = routerUser;
