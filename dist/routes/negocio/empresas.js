"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require("../validarToken"));
const empresas_controller_1 = require("../../controllers/negocio/empresas-controller");
const routerEmpresa = (0, express_1.Router)();
routerEmpresa.get('/getAllEmpresas', validarToken_1.default, empresas_controller_1.getAllEmpresas); // Obtiene todas las Empresas
routerEmpresa.post('/getEmpresa', empresas_controller_1.getEmpresa); // Obtiene la Empresa especificada
routerEmpresa.post('/postEmpresa', validarToken_1.default, empresas_controller_1.postEmpresa); //Inserta una nueva Empresa en la Base de Datos
routerEmpresa.delete('/deleteEmpresa', validarToken_1.default, empresas_controller_1.deleteEmpresa); //Elimina la Empresa de la Base de Datos
routerEmpresa.post('/updateEmpresa', validarToken_1.default, empresas_controller_1.updateEmpresa); //Actualiza la Pyme en la Base de Datos
routerEmpresa.post('/inactivateEmpresa', validarToken_1.default, empresas_controller_1.inactivateEmpresa); //Inactiva una Pyme en la DB
routerEmpresa.post('/activateEmpresa', validarToken_1.default, empresas_controller_1.activateEmpresa); //Activa una Pyme en la DB
routerEmpresa.post('/getEmpresasPymes', validarToken_1.default, empresas_controller_1.getEmpresasPymes); //Activa una Pyme en la DB
routerEmpresa.get('/getEmpresaSearch/:id_empresa', validarToken_1.default, empresas_controller_1.getEmpresaSearch); //Activa una Pyme en la DB
exports.default = routerEmpresa;
