"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require("./validarToken"));
const permisos_controller_1 = require("../controllers/permisos-controller");
const routerPermisos = (0, express_1.Router)();
routerPermisos.get('/getAllPermisos', validarToken_1.default, permisos_controller_1.getAllPermisos); //Muestra todos los Permisos registrados en la base de datos
routerPermisos.get('/getPermiso', validarToken_1.default, permisos_controller_1.getPermiso); //Muestra un Permiso seleccionado
routerPermisos.post('/postPermiso', validarToken_1.default, permisos_controller_1.postPermiso); // Inserta Permisos en la base de datos
routerPermisos.delete('/deletePermiso', validarToken_1.default, permisos_controller_1.deletePermiso); // Elimina Permiso en la base de datos
routerPermisos.post('/updatePermisos', validarToken_1.default, permisos_controller_1.updatePermisos); // actualiza permiso en la base de datos
exports.default = routerPermisos;
