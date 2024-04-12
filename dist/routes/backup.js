"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backup.ts
const express_1 = __importDefault(require("express"));
const backup_controller_1 = require("../controllers/backup-controller"); // Importa la función de controlador
const validarToken_1 = __importDefault(require("./validarToken"));
const backup = express_1.default.Router();
// Define la ruta para realizar la copia de seguridad
backup.get('/generar', validarToken_1.default, backup_controller_1.realizarCopiaSeguridad);
exports.default = backup;
