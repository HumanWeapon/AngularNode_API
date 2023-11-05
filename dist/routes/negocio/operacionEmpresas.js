"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require("../validarToken"));
const operacionEmpresas_controller_1 = require("../../controllers/negocio/operacionEmpresas-controller");
const routerOpEmpresa = (0, express_1.Router)();
routerOpEmpresa.get('/getAllOpEmpresas', validarToken_1.default, operacionEmpresas_controller_1.getAllOpEmpresas); // Obtiene todas las Empresas
routerOpEmpresa.post('/getOpEmpresa', operacionEmpresas_controller_1.getOpEmpresa); // Obtiene la Empresa especificada
exports.default = routerOpEmpresa;
