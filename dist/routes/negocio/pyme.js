"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pyme_controller_1 = require("../../controllers/negocio/pyme.controller");
const validarToken_1 = __importDefault(require("../validarToken"));
const routerPyme = (0, express_1.Router)();
routerPyme.get('/getAllPymes', validarToken_1.default, pyme_controller_1.getAllPymes); // obtiene todos los usuarios
routerPyme.post('/getPyme', pyme_controller_1.getPyme); // obtiene el usuario especificado
exports.default = routerPyme;
