"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require("./validarToken"));
const preguntas_usuario_controller_1 = require("../controllers/preguntas_usuario-controller");
const routerPreguntasUsuario = (0, express_1.Router)();
routerPreguntasUsuario.get('/getAllPreguntasUsuario', validarToken_1.default, preguntas_usuario_controller_1.getAllPreguntasUsuario); //Inicia sesión en la DB
routerPreguntasUsuario.post('/getPreguntasusuario', validarToken_1.default, preguntas_usuario_controller_1.getPreguntasusuario); //Inserta un usuario en la DB
routerPreguntasUsuario.post('/postPreguntaUsuario', validarToken_1.default, preguntas_usuario_controller_1.postPreguntaUsuario); // obtiene todos los usuarios
routerPreguntasUsuario.put('/updatePreguntaUsuario', validarToken_1.default, preguntas_usuario_controller_1.updatePreguntaUsuario); // Actualiza las preguntas por el usuario seleccionado
routerPreguntasUsuario.post('/validarRespuestas', validarToken_1.default, preguntas_usuario_controller_1.validarRespuestas); //Inserta un usuario en la DB
routerPreguntasUsuario.post('/preguntasRespuestas', validarToken_1.default, preguntas_usuario_controller_1.preguntasRespuestas); //
routerPreguntasUsuario.post('/activatePreguntaUsuario', preguntas_usuario_controller_1.activatePreguntaUsuario); // elimina el registro con el usuario especificado
routerPreguntasUsuario.post('/inactivatePreguntaUsuario', preguntas_usuario_controller_1.inactivatePreguntaUsuario); // elimina el registro con el usuario especificado
exports.default = routerPreguntasUsuario;
