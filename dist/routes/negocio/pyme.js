"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pyme_controller_1 = require("../../controllers/negocio/pyme.controller");
const validarToken_1 = require("../validarToken");
const routerPyme = (0, express_1.Router)();
routerPyme.post('/login', pyme_controller_1.loginPyme); //Inicia sesión en la DB
routerPyme.get('/getAllPymes', validarToken_1.validarToken, pyme_controller_1.getAllPymes); // obtiene todas las Pymes
routerPyme.post('/getPyme', validarToken_1.validarTokenpyme, validarToken_1.validarToken, pyme_controller_1.getPyme); // obtiene la Pyme especificada
routerPyme.delete('/deletePyme', validarToken_1.validarToken, pyme_controller_1.deletePyme); //Elimina la Pyme de la Base de Datos
routerPyme.post('/updatePyme', validarToken_1.validarToken, pyme_controller_1.updatePyme); //Actualiza la Pyme en la Base de Datos
routerPyme.post('/postPyme', validarToken_1.validarToken, pyme_controller_1.postPyme); //Inserta un nuevo Pyme en la Base de Datos
routerPyme.post('/inactivatePyme', validarToken_1.validarToken, pyme_controller_1.inactivatePyme); //Inactiva una Pyme en la DB
routerPyme.post('/activatePyme', validarToken_1.validarToken, pyme_controller_1.activatePyme); //Activa una Pyme en la DB
routerPyme.get('/pymesAllTipoEmpresa', validarToken_1.validarTokenpyme, validarToken_1.validarToken, pyme_controller_1.pymesAllTipoEmpresa); //Activa un usuario en la DB
routerPyme.get('/getRolPyme', validarToken_1.validarTokenpyme, validarToken_1.validarToken, pyme_controller_1.getRolPyme); //Obtiene el id del rol PYME
routerPyme.get('/getOnePyme/:id', validarToken_1.validarTokenpyme, validarToken_1.validarToken, pyme_controller_1.getOnePyme); //Obtiene la PYME por el nombre
exports.default = routerPyme;
