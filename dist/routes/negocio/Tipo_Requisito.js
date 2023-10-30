"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require("../validarToken"));
const Tipo_requisito_controller_1 = require("../../controllers/negocio/Tipo_requisito-controller");
const Tipo_requisito_controller_2 = require("../../controllers/negocio/Tipo_requisito-controller");
const routerTipo_Requisito = (0, express_1.Router)();
routerTipo_Requisito.get('/getAllTipo_Requisito', validarToken_1.default, Tipo_requisito_controller_1.getAllTipo_Requisito); //Muestra todos los Permisos registrados en la base de datos
routerTipo_Requisito.get('/getTipo_Requisito', validarToken_1.default, Tipo_requisito_controller_2.getTipo_Requisito); //Muestra un Permiso seleccionado
routerTipo_Requisito.post('/postTipo_Requisito', validarToken_1.default, Tipo_requisito_controller_1.postTipo_Requisito); // Inserta Permisos en la base de datos
routerTipo_Requisito.delete('/deleteTipo_Requisito', validarToken_1.default, Tipo_requisito_controller_1.deleteTipo_Requisito); // Elimina Permiso en la base de datos
routerTipo_Requisito.post('/updateTipoRequisito', validarToken_1.default, Tipo_requisito_controller_1.updateTipo_Requisito); // actualiza permiso en la base de datos
exports.default = routerTipo_Requisito;
