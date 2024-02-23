"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Empresas_Productos_controller_1 = require("../../../controllers/negocio/Operaciones/Empresas_Productos-controller");
const validarToken_1 = __importDefault(require("../../validarToken"));
const empresasProductos = (0, express_1.Router)();
empresasProductos.post('/agregarOperacionEmpresaProducto', validarToken_1.default, Empresas_Productos_controller_1.agregarOperacionEmpresaProducto);
empresasProductos.get('/consultarOperacionesEmpresasProductos', validarToken_1.default, Empresas_Productos_controller_1.consultarOperacionesEmpresasProductos);
empresasProductos.get('/consultarOperacionEmpresaProductoPorId:id', validarToken_1.default, Empresas_Productos_controller_1.consultarOperacionEmpresaProductoPorId);
empresasProductos.delete('/eliminarOperacionEmpresaProducto:id', validarToken_1.default, Empresas_Productos_controller_1.eliminarOperacionEmpresaProducto);
exports.default = empresasProductos;
