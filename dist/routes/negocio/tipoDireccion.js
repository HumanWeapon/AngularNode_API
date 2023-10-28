"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require(".././validarToken"));
const tipoDireccion_controller_1 = require("../../controllers/negocio/tipoDireccion-controller");
const routerTipoDireccion = (0, express_1.Router)();
routerTipoDireccion.get('/getAllTipoDirecciones', validarToken_1.default, tipoDireccion_controller_1.getAllTipoDirecciones); //consulta todas las direcciónes en la base de datos
routerTipoDireccion.get('/getTipoDireccion', validarToken_1.default, tipoDireccion_controller_1.getTipoDireccion); //consulta una dirección en la base de datos
routerTipoDireccion.post('/postTipoDireccion', validarToken_1.default, tipoDireccion_controller_1.postTipoDireccion); // Inserta una dirección en la base de datos
routerTipoDireccion.delete('/deleteTipoDireccion', validarToken_1.default, tipoDireccion_controller_1.deleteTipoDireccion); //Elimina una dirección en la base de datos
routerTipoDireccion.post('/updateTipoDireccion', validarToken_1.default, tipoDireccion_controller_1.updateTipoDireccion); // actualiza una dirección en la base de datos
exports.default = routerTipoDireccion;
/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */ 
