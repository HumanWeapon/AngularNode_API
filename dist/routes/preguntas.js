"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const preguntas_controller_1 = require("../controllers/preguntas-controller");
const routerPreguntas = (0, express_1.Router)();
routerPreguntas.get('/getAllPreguntas', preguntas_controller_1.getAllPreguntas); //Inicia sesión en la DB
routerPreguntas.get('/getPregunta', preguntas_controller_1.getPregunta); //Inserta un usuario en la DB
routerPreguntas.post('/postPregunta', preguntas_controller_1.postPregunta); // obtiene todos los usuarios
routerPreguntas.delete('/deletePregunta', preguntas_controller_1.deletePregunta); // obtiene el usuario especificado
routerPreguntas.post('/updatePregunta', preguntas_controller_1.updatePregunta); // elimina el registro con el usuario especificado
routerPreguntas.post('/activatePregunta', preguntas_controller_1.activatePregunta); // elimina el registro con el usuario especificado
routerPreguntas.post('/inactivatePregunta', preguntas_controller_1.inactivatePregunta); // elimina el registro con el usuario especificado
exports.default = routerPreguntas;
