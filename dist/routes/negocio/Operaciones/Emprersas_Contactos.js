"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require("../../validarToken"));
const Empresas_Contactos_controller_1 = require("../../../controllers/negocio/Operaciones/Empresas_Contactos-controller");
const empresasContatos = (0, express_1.Router)();
empresasContatos.get('/consultarContactosNoRegistradosPorId/:id', validarToken_1.default, Empresas_Contactos_controller_1.consultarContactosNoRegistradosPorId);
empresasContatos.get('/consultarContactosActivosporId/:id', validarToken_1.default, Empresas_Contactos_controller_1.consultarContactosActivosporId);
//empresasContatos.get('/consultarOperacionEmpresaProductoPorId/:id', validarToken, consultarOperacionEmpresaProductoPorId);
//empresasContatos.get('/consultarProductosNoRegistradosPorId/:id', validarToken, consultarProductosNoRegistradosPorId);
//empresasContatos.delete('/eliminarOperacionEmpresaProducto/:id', validarToken, eliminarOperacionEmpresaProducto);
exports.default = empresasContatos;
