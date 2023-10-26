"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require(".././validarToken"));
const paises_controller_1 = require("../../controllers/negocio/paises-controller");
const routerPaises = (0, express_1.Router)();
routerPaises.get('/getAllPaises', validarToken_1.default, paises_controller_1.getAllPaises); //Consulta todos los parametros en la base de datos
routerPaises.post('/getOnePaises', validarToken_1.default, paises_controller_1.getOnePaises); //Consulta todos los parametros en la base de datos
exports.default = routerPaises;
