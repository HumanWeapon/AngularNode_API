"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require("./validarToken"));
const roles_controller_1 = require("../controllers/roles-controller");
const routerRoles = (0, express_1.Router)();
routerRoles.get('/getAllRoles', validarToken_1.default, roles_controller_1.getAllRoles); //Muestra todos los Roles registrados en la base de datos
routerRoles.get('/getRol', validarToken_1.default, roles_controller_1.getRol); //Muestra un Rol seleccionado
routerRoles.post('/postRol', validarToken_1.default, roles_controller_1.postRol); // Inserta Roles en la base de datos
routerRoles.delete('/deleteRol', validarToken_1.default, roles_controller_1.deleteRol); // Elimina Rol en la base de datos
routerRoles.post('/updateRoles', validarToken_1.default, roles_controller_1.updateRoles); // actualiza rol en la base de datos
routerRoles.post('/inactivateRol', validarToken_1.default, roles_controller_1.inactivateRol); //Inactiva una Pyme en la DB
routerRoles.post('/activateRol', validarToken_1.default, roles_controller_1.activateRol); //Activa una Pyme en la DB
exports.default = routerRoles;
