"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Elaborado Por Breydy Flores
const express_1 = require("express");
const validarToken_1 = __importDefault(require(".././validarToken"));
const categoria_controller_1 = require("../../controllers/negocio/categoria-controller");
const routerCategoria = (0, express_1.Router)();
routerCategoria.get('/getAllCategorias', validarToken_1.default, categoria_controller_1.getAllCategorias); //consulta todas lascategorias en la base de datos
routerCategoria.get('/getCategoria', validarToken_1.default, categoria_controller_1.getCategoria); //consulta una categoria en la base de datos
routerCategoria.post('/postCategoria', validarToken_1.default, categoria_controller_1.postCategoria); // Inserta una categoria en la base de datos
routerCategoria.delete('/deleteCategoria', validarToken_1.default, categoria_controller_1.deleteCategoria); //Elimina una catoria en la base de datos
routerCategoria.post('/updateCategoria', validarToken_1.default, categoria_controller_1.updateCategoria); // actualiza una categoria en la base de datos
routerCategoria.post('/inactivateCategoria', validarToken_1.default, categoria_controller_1.inactivateCategoria); //Inactiva una Categoria en la DB
routerCategoria.post('/activateCategoria', validarToken_1.default, categoria_controller_1.activateCategoria); //Activa una Categoria en la DB
routerCategoria.post('/getAllProductosByCategoria', validarToken_1.default, categoria_controller_1.getAllProductosByCategoria); // Obtiene la Empresa especificada
exports.default = routerCategoria;
