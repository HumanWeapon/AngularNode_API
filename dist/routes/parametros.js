"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parametros_controller_1 = require("../controllers/parametros-controller");
const routerParametros = (0, express_1.Router)();
routerParametros.get('/getAllParametros', parametros_controller_1.getAllParametros); //Consulta todos los parametros en la base de datos
routerParametros.get('/getParametro', parametros_controller_1.getParametro); //Consulta un parametro en la base de datos
routerParametros.post('/postParametro', parametros_controller_1.postParametro); // inserta un parametro en la base de datos
routerParametros.delete('/deleteParametro', parametros_controller_1.deleteParametro); // elimina un parametro en la base de datos
routerParametros.post('/updateParametro', parametros_controller_1.updateParametro); // actualiza un parametro en la base de datos
exports.default = routerParametros;
