"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parametros_controller_1 = require("../controllers/parametros-controller");
const routerParametros = (0, express_1.Router)();
routerParametros.get('/getAllParametros', parametros_controller_1.getAllParametros); //Inicia sesión en la DB
routerParametros.get('/getParametro', parametros_controller_1.getParametro); //Inserta un usuario en la DB
routerParametros.post('/postParametro', parametros_controller_1.postParametro); // obtiene todos los usuarios
routerParametros.delete('/deleteParametro', parametros_controller_1.deleteParametro); // obtiene el usuario especificado
routerParametros.post('/updateParametro', parametros_controller_1.updateParametro); // elimina el registro con el usuario especificado
exports.default = routerParametros;
