"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require("./validarToken"));
const preguntas_controller_1 = require("../controllers/preguntas-controller");
const routerPreguntas = (0, express_1.Router)();
routerPreguntas.get('/getAllPreguntas', preguntas_controller_1.getAllPreguntas); //Inicia sesión en la DB
routerPreguntas.get('/getPregunta', validarToken_1.default, preguntas_controller_1.getPregunta); //Inserta un usuario en la DB
routerPreguntas.post('/postPregunta', validarToken_1.default, preguntas_controller_1.postPregunta); // obtiene todos los usuarios
routerPreguntas.delete('/deletePregunta', validarToken_1.default, preguntas_controller_1.deletePregunta); // obtiene el usuario especificado
routerPreguntas.post('/updatePregunta', validarToken_1.default, preguntas_controller_1.updatePregunta); // elimina el registro con el usuario especificado
exports.default = routerPreguntas;
