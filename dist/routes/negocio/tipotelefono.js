"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require(".././validarToken"));
const tipotelefono_controller_1 = require("../../controllers/negocio/tipotelefono-controller");
const routertipoTelefono = (0, express_1.Router)();
routertipoTelefono.get('/getAllTelefonos', validarToken_1.default, tipotelefono_controller_1.getAllTelefonos); //Consulta todos los Telefonos de la Base de Datos
routertipoTelefono.post('/getTelefono', validarToken_1.default, tipotelefono_controller_1.getTelefono); //Consulta un Telefono en la Base de Datos
routertipoTelefono.delete('/deleteTelefono', validarToken_1.default, tipotelefono_controller_1.deleteTelefono); //Elimina el Telefono de la Base de Datos
routertipoTelefono.post('/updateTelefono', validarToken_1.default, tipotelefono_controller_1.updateTelefono); //Actualiza el Telefono en la Base de Datos
routertipoTelefono.post('/postTelefono', validarToken_1.default, tipotelefono_controller_1.postTelefono); //Inserta un nuevo Telefono en la Base de Datos
exports.default = routertipoTelefono;
