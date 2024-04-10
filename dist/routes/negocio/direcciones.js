"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require("../validarToken"));
const direcciones_controllers_1 = require("../../controllers/negocio/direcciones-controllers");
const routerDireccionContacto = (0, express_1.Router)();
routerDireccionContacto.get('/getdirecciones', validarToken_1.default, direcciones_controllers_1.getdirecciones); //Obtiene las direcciones
routerDireccionContacto.get('/getTipoDirecciones', validarToken_1.default, direcciones_controllers_1.getTipoDirecciones); //Obtiene todos los tipo de dirección activos
routerDireccionContacto.get('/getCiudades', validarToken_1.default, direcciones_controllers_1.getCiudades); //Obtiene todos los tipo de dirección activos
routerDireccionContacto.get('/getDireccionesEmpresaporID/:id', validarToken_1.default, direcciones_controllers_1.getDireccionesEmpresaporID); //Obtiene las direcciones registradas por empresa
routerDireccionContacto.get('/getDireccionesEmpresaporActivasID/:id', validarToken_1.default, direcciones_controllers_1.getDireccionesEmpresaporActivasID); //Obtiene las direcciones registradas por empresa
routerDireccionContacto.post('/inactivateDirecion', validarToken_1.default, direcciones_controllers_1.inactivateDirecion); //inactiva las direcciones de la dba
routerDireccionContacto.post('/activateDireccion', validarToken_1.default, direcciones_controllers_1.activateDireccion); //activa las direcciones de la dba
routerDireccionContacto.post('/postDireccion', validarToken_1.default, direcciones_controllers_1.postDireccion); // Inserta una nueva dirección en la DBA
routerDireccionContacto.put('/updateDireccion/:id', validarToken_1.default, direcciones_controllers_1.putDireccion); // Nueva ruta para actualizar dirección por ID
exports.default = routerDireccionContacto;
