"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./models/server"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = new server_1.default();
// app.ts o index.ts
const express_1 = __importDefault(require("express"));
const backup_1 = __importDefault(require("./routes/backup")); // Importa el enrutador de backup
const app = (0, express_1.default)();
// Configura middleware y otras configuraciones de la aplicación...
// Usa el enrutador de backup en la ruta /backup
app.use('/backup', backup_1.default);
// Otros enrutadores y configuraciones...
// Inicia el servidor
app.listen(4200, () => {
    console.log('Servidor en funcionamiento en el puerto 4200');
});
