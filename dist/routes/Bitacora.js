"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = __importDefault(require("./validarToken"));
const bitacora_controller_1 = require("../controllers/bitacora-controller");
const routerBitacora = (0, express_1.Router)();
routerBitacora.get('/getAllBitacora', validarToken_1.default, bitacora_controller_1.getAllBitacora); //consulta todos los registros en la base de datos
routerBitacora.post('/postBitacora', validarToken_1.default, bitacora_controller_1.PostBitacora); //Inserta un evento en la DBA
routerBitacora.delete('/deleteBitacora', validarToken_1.default, bitacora_controller_1.DeleteBitacora); // Elimina todos los registros de la DBA
exports.default = routerBitacora;
