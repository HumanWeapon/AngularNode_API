"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require("../validarToken"));
const direccionesContacto_controllers_1 = require("../../controllers/negocio/direccionesContacto-controllers");
const routerDireccionContacto = (0, express_1.Router)();
routerDireccionContacto.get('/getAllDirecContactos', validarToken_1.default, direccionesContacto_controllers_1.getAllDirecContactos); // Obtiene todas las Empresas
routerDireccionContacto.post('/getDirecContactos', direccionesContacto_controllers_1.getDirecContactos); // Obtiene la Empresa especificada
routerDireccionContacto.post('/postDirecContactos', validarToken_1.default, direccionesContacto_controllers_1.postDirecContactos); //Inserta una nueva Empresa en la Base de Datos
routerDireccionContacto.delete('/deleteDirecContactos', validarToken_1.default, direccionesContacto_controllers_1.deleteDirecContactos); //Elimina la Empresa de la Base de Datos
routerDireccionContacto.post('/updateDirecContactos', validarToken_1.default, direccionesContacto_controllers_1.updateDirecContactos); //Actualiza la Pyme en la Base de Datos
routerDireccionContacto.post('/inactivateDirecContactos', validarToken_1.default, direccionesContacto_controllers_1.inactivateDirecContactos); //Inactiva una Pyme en la DB
routerDireccionContacto.post('/activateDirecContactos', validarToken_1.default, direccionesContacto_controllers_1.activateDirecContactos); //Activa una Pyme en la DB
exports.default = routerDireccionContacto;
