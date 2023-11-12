"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require(".././validarToken"));
const contacto_controller_1 = require("../../controllers/negocio/contacto-controller");
const routerContacto = (0, express_1.Router)();
routerContacto.get('/getAllContactos', validarToken_1.default, contacto_controller_1.getAllContactos); //consulta todas las direcciónes en la base de datos
routerContacto.get('/getContacto', validarToken_1.default, contacto_controller_1.getContacto); //consulta una dirección en la base de datos
routerContacto.post('/postContacto', validarToken_1.default, contacto_controller_1.postContacto); // Inserta una dirección en la base de datos
routerContacto.delete('/deleteContacto', validarToken_1.default, contacto_controller_1.deleteContacto); //Elimina una dirección en la base de datos
routerContacto.post('/updateContacto', validarToken_1.default, contacto_controller_1.updateContacto); // actualiza una dirección en la base de datos
routerContacto.post('/inactivateContacto', validarToken_1.default, contacto_controller_1.inactivateContacto); //Inactiva una Pyme en la DB
routerContacto.post('/activateContacto', validarToken_1.default, contacto_controller_1.activateContacto); //Activa una Pyme en la DB
exports.default = routerContacto;
/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */ 
