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
routerPermisos.get('/objetosSinRol/:id', validarToken_1.default, permisos_controller_1.objetosSinRol); //Muestra todos los Permisos registrados en la base de datos
routerPermisos.get('/permisosdeRoutes/:id_rol/:id_objeto/:id_usuario', validarToken_1.default, permisos_controller_1.permisosdeRoutes); //Muestra todos los Permisos registrados en la base de datos
routerPermisos.get('/getPermiso', validarToken_1.default, permisos_controller_1.getPermiso); //Muestra un Permiso seleccionado
routerPermisos.post('/postPermiso', validarToken_1.default, permisos_controller_1.postPermiso); // Inserta Permisos en la base de datos
routerPermisos.delete('/deletePermiso', validarToken_1.default, permisos_controller_1.deletePermiso); // Elimina Permiso en la base de datos
routerPermisos.post('/updatePermisos', validarToken_1.default, permisos_controller_1.updatePermisos); // actualiza permiso en la base de datos
routerPermisos.post('/inactivatePermiso', validarToken_1.default, permisos_controller_1.inactivatePermiso); //Inactiva una Pyme en la DB
routerPermisos.post('/activatePermiso', validarToken_1.default, permisos_controller_1.activatePermiso); //Activa una Pyme en la DB
routerPermisos.post('/permisosRolesObjetos', validarToken_1.default, permisos_controller_1.permisosRolesObjetos); //Activa una Pyme en la DB
routerPermisos.get('/getPermnisosObjetos/:id_rol/:id_objeto', validarToken_1.default, permisos_controller_1.permisosRolesObjetos); //Activa una Pyme en la DB
exports.default = routerPermisos;
