"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const preguntas_usuario_controller_1 = require("../controllers/preguntas_usuario-controller");
const routerPreguntasUsuario = (0, express_1.Router)();
routerPreguntasUsuario.get('/getAllPreguntasUsuario', preguntas_usuario_controller_1.getAllPreguntasUsuario); //Inicia sesión en la DB
routerPreguntasUsuario.post('/getPreguntasusuario', preguntas_usuario_controller_1.getPreguntasusuario); //Inserta un usuario en la DB
routerPreguntasUsuario.post('/postPreguntaUsuario', preguntas_usuario_controller_1.postPreguntaUsuario); // obtiene todos los usuarios
routerPreguntasUsuario.put('/updatePreguntaUsuario', preguntas_usuario_controller_1.updatePreguntaUsuario); // Actualiza las preguntas por el usuario seleccionado
exports.default = routerPreguntasUsuario;
;
