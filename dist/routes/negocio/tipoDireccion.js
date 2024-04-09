"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require(".././validarToken");
const tipoDireccion_controller_1 = require("../../controllers/negocio/tipoDireccion-controller");
const routerTipoDireccion = (0, express_1.Router)();
routerTipoDireccion.get('/getAllTipoDirecciones', validarToken_1.validarToken, tipoDireccion_controller_1.getAllTipoDirecciones); //consulta todas las direcciónes en la base de datos
routerTipoDireccion.get('/getTipoDireccion', validarToken_1.validarToken, tipoDireccion_controller_1.getTipoDireccion); //consulta una dirección en la base de datos
routerTipoDireccion.get('/getTipoDirecciones', validarToken_1.validarToken, tipoDireccion_controller_1.getTipoDirecciones); //consulta una dirección en la base de datos
routerTipoDireccion.post('/postTipoDireccion', validarToken_1.validarToken, tipoDireccion_controller_1.postTipoDireccion); // Inserta una dirección en la base de datos
routerTipoDireccion.delete('/deleteTipoDireccion', validarToken_1.validarToken, tipoDireccion_controller_1.deleteTipoDireccion); //Elimina una dirección en la base de datos
routerTipoDireccion.post('/updateTipoDireccion', validarToken_1.validarToken, tipoDireccion_controller_1.updateTipoDireccion); // actualiza una dirección en la base de datos
routerTipoDireccion.post('/inactivateTipoDireccion', validarToken_1.validarToken, tipoDireccion_controller_1.inactivateTipoDireccion); //Inactiva una Direccion en la DB
routerTipoDireccion.post('/activateTipoDireccion', validarToken_1.validarToken, tipoDireccion_controller_1.activateTipoDireccion); //Activa una Direccion en la DB
exports.default = routerTipoDireccion;
/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */ 
