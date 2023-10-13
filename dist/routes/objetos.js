"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const objetos_controller_1 = require("../controllers/objetos-controller");
const routerObjetos = (0, express_1.Router)();
routerObjetos.get('/getAllObjetos', objetos_controller_1.getAllObjetos); //consulta todos los objetos en la base de datos
routerObjetos.get('/getObjeto', objetos_controller_1.getObjeto); //consulta un objeto en la base de datos
routerObjetos.post('/postObjeto', objetos_controller_1.postObjeto); // Inserta un objeto en la base de datos
routerObjetos.delete('/deleteObjeto', objetos_controller_1.deleteObjeto); //Elimina un objeto en la base de datos
routerObjetos.post('/updateObjetos', objetos_controller_1.updateObjetos); // actualiza un objeto en la base de datos
exports.default = routerObjetos;
