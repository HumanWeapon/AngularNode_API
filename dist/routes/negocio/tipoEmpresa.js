"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require(".././validarToken"));
const tipoEmpresa_controller_1 = require("../../controllers/negocio/tipoEmpresa-controller");
const routerTipoEmpresa = (0, express_1.Router)();
routerTipoEmpresa.get('/getAllTipoEmpresa', validarToken_1.default, tipoEmpresa_controller_1.getAllTipoEmpresa); //consulta todas las direcciónes en la base de datos
routerTipoEmpresa.get('/getTipoEmpresa', validarToken_1.default, tipoEmpresa_controller_1.getTipoEmpresa); //consulta una dirección en la base de datos
routerTipoEmpresa.post('/postTipoEmpresa', validarToken_1.default, tipoEmpresa_controller_1.postTipoEmpresa); // Inserta una dirección en la base de datos
routerTipoEmpresa.delete('/deleteTipoEmpresa', validarToken_1.default, tipoEmpresa_controller_1.deleteTipoEmpresa); //Elimina una dirección en la base de datos
routerTipoEmpresa.post('/updateTipoEmpresa', validarToken_1.default, tipoEmpresa_controller_1.updateTipoEmpresa); // actualiza una dirección en la base de datos
routerTipoEmpresa.post('/inactivateTipoEmpresa', validarToken_1.default, tipoEmpresa_controller_1.inactivateTipoEmpresa); //Inactiva una Pyme en la DB
routerTipoEmpresa.post('/activateTipoEmpresa', validarToken_1.default, tipoEmpresa_controller_1.activateTipoEmpresa); //Activa una Pyme en la DB
exports.default = routerTipoEmpresa;
