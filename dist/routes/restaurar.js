"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurar_1 = require("../controllers/restaurar"); // Importa la función de controlador
const restaurarRouter = express_1.default.Router();
// Define la ruta para restaurar la copia de seguridad
restaurarRouter.post('/restaurar', restaurar_1.restaurarCopiaSeguridad);
exports.default = restaurarRouter;
