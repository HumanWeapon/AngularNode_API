"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../validarToken");
const operacionEmpresas_controller_1 = require("../../controllers/negocio/operacionEmpresas-controller");
const routerOpEmpresa = (0, express_1.Router)();
routerOpEmpresa.get('/getAllOpEmpresas', validarToken_1.validarToken, operacionEmpresas_controller_1.getAllOpEmpresas); // Obtiene todas las Empresas
routerOpEmpresa.post('/getOpEmpresa', validarToken_1.validarToken, operacionEmpresas_controller_1.getOpEmpresa); // Obtiene la Empresa especificada
routerOpEmpresa.post('/postOpEmpresa', validarToken_1.validarToken, operacionEmpresas_controller_1.postOpEmpresa); //Inserta una nueva Empresa en la Base de Datos
exports.default = routerOpEmpresa;
