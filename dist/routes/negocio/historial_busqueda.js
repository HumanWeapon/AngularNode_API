"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require(".././validarToken"));
const historial_busqueda_1 = require("../../controllers/negocio/historial_busqueda");
const routerHistB = (0, express_1.Router)();
routerHistB.get('/getAllHistorialB', validarToken_1.default, historial_busqueda_1.getAllHistorialB); //Consulta todos los parametros en la base de datos
routerHistB.post('/getHistorialB', validarToken_1.default, historial_busqueda_1.getHistorialB); //Consulta solo un elemento en la base de datos
routerHistB.post('/postHistorialB', validarToken_1.default, historial_busqueda_1.postHistorialB); //Inserta una nuevo Pais en la Base de Datos
routerHistB.delete('/deleteHistorialB', validarToken_1.default, historial_busqueda_1.deleteHistorialB); //Elimina el Pais de la Base de Datos
routerHistB.post('/updateHistorialB', validarToken_1.default, historial_busqueda_1.updateHistorialB); //Actualiza el Pais en la Base de Datos
routerHistB.post('/inactivateHistorialB', validarToken_1.default, historial_busqueda_1.inactivateHistorialB); //Inactiva un Pais en la DB
routerHistB.post('/activateHistorialB', validarToken_1.default, historial_busqueda_1.activateHistorialB); //Activa un Pais en la DB
exports.default = routerHistB;
