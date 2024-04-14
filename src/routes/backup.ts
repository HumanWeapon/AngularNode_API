// backup.ts
import express from 'express';
import { realizarCopiaSeguridad } from '../controllers/backup-controller'; // Importa la función de controlador
import validarToken from './validarToken';

const backup = express.Router();

// Define la ruta para realizar la copia de seguridad
backup.get('/generar', validarToken, realizarCopiaSeguridad);

export default backup;