"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../controllers/usuario");
const validarToken_1 = __importDefault(require("./validarToken"));
const router = (0, express_1.Router)();
router.post('/login', validarToken_1.default, usuario_1.loginUser); //Inicia sesión en la DB
router.post('/postUsuario', validarToken_1.default, usuario_1.postUsuario); //Inserta un usuario en la DB
router.get('/getAllUsuarios', usuario_1.getAllUsuarios); // obtiene todos los usuarios
router.get('/getUsuario', usuario_1.getUsuario); // obtiene el usuario especificado
router.delete('/deleteUsuario', usuario_1.deleteUsuario); // elimina el registro con el usuario especificado
exports.default = router;
