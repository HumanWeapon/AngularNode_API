"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require(".././validarToken");
const paises_controller_1 = require("../../controllers/negocio/paises-controller");
const routerPaises = (0, express_1.Router)();
routerPaises.get('/getAllPaises', validarToken_1.validarToken, paises_controller_1.getAllPaises); //Consulta todos los parametros en la base de datos
routerPaises.post('/getPais', validarToken_1.validarToken, paises_controller_1.getPais); //Consulta solo un elemento en la base de datos
routerPaises.post('/postPais', validarToken_1.validarToken, paises_controller_1.postPais); //Inserta una nuevo Pais en la Base de Datos
routerPaises.delete('/deletePais', validarToken_1.validarToken, paises_controller_1.deletePais); //Elimina el Pais de la Base de Datos
routerPaises.post('/updatePais', validarToken_1.validarToken, paises_controller_1.updatePais); //Actualiza el Pais en la Base de Datos
routerPaises.post('/inactivatePais', validarToken_1.validarToken, paises_controller_1.inactivatePais); //Inactiva un Pais en la DB
routerPaises.post('/activatePais', validarToken_1.validarToken, paises_controller_1.activatePais); //Activa un Pais en la DB
exports.default = routerPaises;
