"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pyme_controller_1 = require("../../controllers/negocio/pyme.controller");
const validarToken_1 = __importDefault(require("../validarToken"));
const routerPyme = (0, express_1.Router)();
routerPyme.get('/getAllPymes', validarToken_1.default, pyme_controller_1.getAllPymes); // obtiene todas las Pymes
routerPyme.post('/getPyme', pyme_controller_1.getPyme); // obtiene la Pyme especificada
routerPyme.delete('/deletePyme', validarToken_1.default, pyme_controller_1.deletePyme); //Elimina la Pyme de la Base de Datos
routerPyme.post('/updatePyme', validarToken_1.default, pyme_controller_1.updatePyme); //Actualiza la Pyme en la Base de Datos
routerPyme.post('/postPyme', validarToken_1.default, pyme_controller_1.postPyme); //Inserta un nuevo Pyme en la Base de Datos
exports.default = routerPyme;
