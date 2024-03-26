"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require("../validarToken"));
const Telefonos_controller_1 = require("../../controllers/negocio/Telefonos-controller");
const routerContactoTelefono = (0, express_1.Router)();
routerContactoTelefono.get('/getAllContactosTelefono', validarToken_1.default, Telefonos_controller_1.getAllContactosTelefono); //consulta todas los contactos en la base de datos
//routerContactoTelefono.get('/telefonosconcontacto',validarToken, telefonosconcontacto);//consulta todas los telefonos con el contacto activo de la DBA.
routerContactoTelefono.get('/telefonosdeContactosPorId', validarToken_1.default, Telefonos_controller_1.telefonosdeContactosPorId); //consulta todas los contactos en la base de datos
routerContactoTelefono.post('/getContactoTelefono', validarToken_1.default, Telefonos_controller_1.getContactoTelefono); //consulta un contactos  en la base de datos
routerContactoTelefono.post('/postContactoTelefono', validarToken_1.default, Telefonos_controller_1.postContactoTelefono); // Inserta un contactos  en la base de datos
routerContactoTelefono.delete('/deleteContactoTelefono', validarToken_1.default, Telefonos_controller_1.deleteContactoTelefono); //Elimina un contactos en la base de datos
routerContactoTelefono.post('/updateContactoTelefono', validarToken_1.default, Telefonos_controller_1.updateContactoTelefono); // actualiza un contacto en la base de datos
routerContactoTelefono.post('/inactivateContactoTelefono', validarToken_1.default, Telefonos_controller_1.inactivateContactoTelefono); //Inactiva una Pyme en la DB
routerContactoTelefono.post('/activateContactoTelefono', validarToken_1.default, Telefonos_controller_1.activateContactoTelefono); //Activa una Pyme en la DB
routerContactoTelefono.get('/telefonosAllContactos', validarToken_1.default, Telefonos_controller_1.telefonosAllContactos); //Trae los telefonos de los contactos
exports.default = routerContactoTelefono;
/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */ 
