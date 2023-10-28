"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require(".././validarToken"));
const ciudades_controller_1 = require("../../controllers/negocio/ciudades-controller");
const routerCiudades = (0, express_1.Router)();
routerCiudades.get('/getAllCiudades', validarToken_1.default, ciudades_controller_1.getAllCiudades); //consulta todas las ciudades en la base de datos
routerCiudades.get('/getCiudad', validarToken_1.default, ciudades_controller_1.getCiudad); //consulta una ciudad en la base de datos
routerCiudades.post('/postCiudad', validarToken_1.default, ciudades_controller_1.postCiudad); // Inserta una ciudad en la base de datos
routerCiudades.delete('/deleteCiudad', validarToken_1.default, ciudades_controller_1.deleteCiudad); //Elimina una ciudad en la base de datos
routerCiudades.post('/updateCiudad', validarToken_1.default, ciudades_controller_1.updateCiudad); // actualiza una ciudad en la base de datos
exports.default = routerCiudades;
/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */ 
