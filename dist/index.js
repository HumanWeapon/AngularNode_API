"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./models/server"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = new server_1.default();
/*

// app.ts o index.ts
import express from 'express';
import backupRouter from './routes/backup'; // Importa el enrutador de backup

const app = express();

// Configura middleware y otras configuraciones de la aplicación...

// Usa el enrutador de backup en la ruta /backup
app.use('/backup', backupRouter);

// Otros enrutadores y configuraciones...

// Inicia el servidor
app.listen(4200, () => {
  console.log('Servidor en funcionamiento en el puerto 4200');
});
*/ 
