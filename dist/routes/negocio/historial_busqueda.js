"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require(".././validarToken");
const historial_busqueda_1 = require("../../controllers/negocio/historial_busqueda");
const routerHistB = (0, express_1.Router)();
routerHistB.get('/getAllHistorialB', validarToken_1.validarToken, historial_busqueda_1.getAllHistorialB); //Consulta todos los registros del historial de búsqueda
routerHistB.get('/getTop10Busquedas', validarToken_1.validarToken, historial_busqueda_1.getTop10Busquedas); //Consulta todos los registros del historial de búsqueda
routerHistB.get('/gethistorial_busqueda_PYME/:id_pyme', validarToken_1.validarToken, historial_busqueda_1.gethistorial_busqueda_PYME); //Consulta todos los registros del historial de búsqueda para una PYME por el id_pyme
routerHistB.post('/postHistorialB', validarToken_1.validarToken, historial_busqueda_1.postHistorialB); //Inserta una nuevo registro en la Base de Datos
exports.default = routerHistB;
