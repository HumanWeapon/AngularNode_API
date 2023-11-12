"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require(".././validarToken"));
const tipoContacto_controller_1 = require("../../controllers/negocio/tipoContacto-controller");
const routerTipoContacto = (0, express_1.Router)();
routerTipoContacto.get('/getAllTipoContactos', validarToken_1.default, tipoContacto_controller_1.getAllTipoContactos); //consulta todas las direcciónes en la base de datos
routerTipoContacto.get('/getTipoContacto', validarToken_1.default, tipoContacto_controller_1.getTipoContacto); //consulta una dirección en la base de datos
routerTipoContacto.post('/postTipoContacto', validarToken_1.default, tipoContacto_controller_1.postTipoContacto); // Inserta una dirección en la base de datos
routerTipoContacto.delete('/deleteTipoContacto', validarToken_1.default, tipoContacto_controller_1.deleteTipoContacto); //Elimina una dirección en la base de datos
routerTipoContacto.post('/updateTipoContacto', validarToken_1.default, tipoContacto_controller_1.updateTipoContacto); // actualiza una dirección en la base de datos
routerTipoContacto.post('/inactivateTipoContacto', validarToken_1.default, tipoContacto_controller_1.inactivateTipoContacto); //Inactiva una Pyme en la DB
routerTipoContacto.post('/activateTipoContacto', validarToken_1.default, tipoContacto_controller_1.activateTipoContacto); //Activa una Pyme en la DB
exports.default = routerTipoContacto;
/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */ 
