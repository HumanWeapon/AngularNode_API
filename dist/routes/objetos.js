"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require("./validarToken"));
const objetos_controller_1 = require("../controllers/objetos-controller");
const routerObjetos = (0, express_1.Router)();
routerObjetos.get('/getAllObjetos', validarToken_1.default, objetos_controller_1.getAllObjetos); //consulta todos los objetos en la base de datos
routerObjetos.get('/getObjeto', validarToken_1.default, objetos_controller_1.getObjeto); //consulta un objeto en la base de datos
routerObjetos.post('/postObjeto', validarToken_1.default, objetos_controller_1.postObjeto); // Inserta un objeto en la base de datos
routerObjetos.delete('/deleteObjeto', validarToken_1.default, objetos_controller_1.deleteObjeto); //Elimina un objeto en la base de datos
routerObjetos.post('/updateObjetos', validarToken_1.default, objetos_controller_1.updateObjetos); // actualiza un objeto en la base de datos
routerObjetos.post('/inactivateObjeto', validarToken_1.default, objetos_controller_1.inactivateObjecto); //Inactiva una Pyme en la DB
routerObjetos.post('/activateObjeto', validarToken_1.default, objetos_controller_1.activateObjeto); //Activa una Pyme en la DB
routerObjetos.post('/getAllObjetosMenu', validarToken_1.default, objetos_controller_1.getAllObjetosMenu); //Activa una Pyme en la DB
routerObjetos.get('/objetosJSON', validarToken_1.default, objetos_controller_1.objetosJSON); //consulta todos los objetos en la base de datos
exports.default = routerObjetos;
