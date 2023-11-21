"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require(".././validarToken"));
const contactoTelefono_controller_1 = require("../../controllers/negocio/contactoTelefono-controller");
const routerContactoTelefono = (0, express_1.Router)();
routerContactoTelefono.get('/getAllContactosTelefono', validarToken_1.default, contactoTelefono_controller_1.getAllContactosTelefono); //consulta todas los contactos en la base de datos
routerContactoTelefono.post('/getContactoTelefono', validarToken_1.default, contactoTelefono_controller_1.getContactoTelefono); //consulta un contactos  en la base de datos
routerContactoTelefono.post('/postContactoTelefono', validarToken_1.default, contactoTelefono_controller_1.postContactoTelefono); // Inserta un contactos  en la base de datos
routerContactoTelefono.delete('/deleteContactoTelefono', validarToken_1.default, contactoTelefono_controller_1.deleteContactoTelefono); //Elimina un contactos en la base de datos
routerContactoTelefono.post('/updateContactoTelefono', validarToken_1.default, contactoTelefono_controller_1.updateContactoTelefono); // actualiza un contacto en la base de datos
routerContactoTelefono.post('/inactivateContactoTelefono', validarToken_1.default, contactoTelefono_controller_1.inactivateContactoTelefono); //Inactiva una Pyme en la DB
routerContactoTelefono.post('/activateContactoTelefono', validarToken_1.default, contactoTelefono_controller_1.activateContactoTelefono); //Activa una Pyme en la DB
exports.default = routerContactoTelefono;
/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */ 
