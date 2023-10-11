"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permisos_controller_1 = require("../controllers/permisos-controller");
const routerPermisos = (0, express_1.Router)();
routerPermisos.get('/getAllPermisos', permisos_controller_1.getAllPermisos); //Muestra todos los Permisos registrados en la base de datos
routerPermisos.get('/getPermiso', permisos_controller_1.getPermiso); //Muestra un Permiso seleccionado
routerPermisos.post('/postPermiso', permisos_controller_1.postPermiso); // Inserta Permisos en la base de datos
routerPermisos.delete('/deletePermiso', permisos_controller_1.deletePermiso); // Elimina Permiso en la base de datos
routerPermisos.post('/updatePermisos', permisos_controller_1.updatePermisos); // actualiza permiso en la base de datos
exports.default = routerPermisos;
