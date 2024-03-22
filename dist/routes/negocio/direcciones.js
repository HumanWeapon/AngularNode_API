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
routerDireccionContacto.get('/getDireccionesEmoresaporID/:id', validarToken_1.default, direcciones_controllers_1.getDireccionesEmoresaporID); //Obtiene todos los tipo de dirección activos
exports.default = routerDireccionContacto;
