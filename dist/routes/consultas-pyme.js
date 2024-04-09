"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pyme_controller_1 = require("../controllers/negocio/pyme.controller");
const validarTokenPyme_1 = __importDefault(require("./validarTokenPyme"));
const routerconsultaspyme = (0, express_1.Router)();
routerconsultaspyme.post('/login', pyme_controller_1.loginPyme); //Inicia sesión en la DB
routerconsultaspyme.get('/getAllPymes', validarTokenPyme_1.default, pyme_controller_1.getAllPymes); // obtiene todas las Pymes
routerconsultaspyme.post('/getPyme', validarTokenPyme_1.default, pyme_controller_1.getPyme); // obtiene la Pyme especificada
routerconsultaspyme.delete('/deletePyme', validarTokenPyme_1.default, pyme_controller_1.deletePyme); //Elimina la Pyme de la Base de Datos
routerconsultaspyme.post('/updatePyme', validarTokenPyme_1.default, pyme_controller_1.updatePyme); //Actualiza la Pyme en la Base de Datos
routerconsultaspyme.post('/postPyme', validarTokenPyme_1.default, pyme_controller_1.postPyme); //Inserta un nuevo Pyme en la Base de Datos
routerconsultaspyme.post('/inactivatePyme', validarTokenPyme_1.default, pyme_controller_1.inactivatePyme); //Inactiva una Pyme en la DB
routerconsultaspyme.post('/activatePyme', validarTokenPyme_1.default, pyme_controller_1.activatePyme); //Activa una Pyme en la DB
routerconsultaspyme.get('/pymesAllTipoEmpresa', validarTokenPyme_1.default, pyme_controller_1.pymesAllTipoEmpresa); //Activa un usuario en la DB
routerconsultaspyme.get('/getRolPyme', validarTokenPyme_1.default, pyme_controller_1.getRolPyme); //Obtiene el id del rol PYME
routerconsultaspyme.get('/getOnePyme/:id', validarTokenPyme_1.default, pyme_controller_1.getOnePyme); //Obtiene la PYME por el nombre
exports.default = routerconsultaspyme;
