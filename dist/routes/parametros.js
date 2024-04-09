"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("./validarToken");
const parametros_controller_1 = require("../controllers/parametros-controller");
const routerParametros = (0, express_1.Router)();
routerParametros.get('/getAllParametros', validarToken_1.validarToken, parametros_controller_1.getAllParametros); //Consulta todos los parametros en la base de datos
routerParametros.get('/getParametro', validarToken_1.validarToken, parametros_controller_1.getParametro); //Consulta un parametro en la base de datos
routerParametros.post('/postParametro', validarToken_1.validarToken, parametros_controller_1.postParametro); // inserta un parametro en la base de datos
routerParametros.delete('/deleteParametro', validarToken_1.validarToken, parametros_controller_1.deleteParametro); // elimina un parametro en la base de datos
routerParametros.post('/updateParametro', validarToken_1.validarToken, parametros_controller_1.updateParametro); // actualiza un parametro en la base de datos
routerParametros.post('/inactivateParametro', validarToken_1.validarToken, parametros_controller_1.inactivateParametro);
routerParametros.post('/activateParametro', validarToken_1.validarToken, parametros_controller_1.activateParametro);
exports.default = routerParametros;
