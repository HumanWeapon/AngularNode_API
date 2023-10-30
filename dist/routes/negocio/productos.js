"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require(".././validarToken"));
const productos_controller_1 = require("../../controllers/negocio/productos_controller");
const routerProductos = (0, express_1.Router)();
routerProductos.get('/getAllProductos', validarToken_1.default, productos_controller_1.getAllProductos); //consulta todos los productos en la base de datos
routerProductos.get('/getProductos', validarToken_1.default, productos_controller_1.getProductos); //consulta un producto en la base de datos
routerProductos.post('/postProducto', validarToken_1.default, productos_controller_1.postProducto); // Inserta un producto en la base de datos
routerProductos.delete('/deleteProducto', validarToken_1.default, productos_controller_1.deleteProducto); //Elimina un producto en la base de datos
routerProductos.post('/updateProductos', validarToken_1.default, productos_controller_1.updateProducto); // actualiza un producto en la base de datos
routerProductos.post('/inactivateProducto', validarToken_1.default, productos_controller_1.inactivateProducto); //Inactiva un producto en la DB
routerProductos.post('/activateProducto', validarToken_1.default, productos_controller_1.activateProducto); //Activa un producto en la DB
exports.default = routerProductos;
