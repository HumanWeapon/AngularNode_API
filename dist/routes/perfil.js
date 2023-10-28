"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const perfil_controller_1 = require("../controllers/perfil-controller");
const routesPerfil = (0, express_1.Router)();
routesPerfil.get('/getUsuarioPerfil', perfil_controller_1.getUsuarioPerfil); // obtiene el usuario especificado
exports.default = routesPerfil;
