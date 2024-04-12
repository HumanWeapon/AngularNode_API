import Server from "./models/server";
import dotenv from "dotenv";


dotenv.config();
const server = new Server();




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
