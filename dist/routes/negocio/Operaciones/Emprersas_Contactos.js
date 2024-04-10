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
empresasContatos.get('/consultarContactosporId/:id', validarToken_1.default, Empresas_Contactos_controller_1.consultarContactosActivosporId);
empresasContatos.get('/consultarContactosActivosporId/:id', validarToken_1.default, Empresas_Contactos_controller_1.consultarContactosActivosporId);
empresasContatos.get('/ReporteContactos', validarToken_1.default, Empresas_Contactos_controller_1.ReporteContactos);
empresasContatos.post('/agregarOperacionEmpresaContacto', validarToken_1.default, Empresas_Contactos_controller_1.agregarOperacionEmpresaContacto);
empresasContatos.delete('/eliminarOperacionEmpresaContacto/:id', validarToken_1.default, Empresas_Contactos_controller_1.eliminarOperacionEmpresaContacto);
exports.default = empresasContatos;
