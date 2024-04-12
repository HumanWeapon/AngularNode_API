// backup.ts
import express from 'express';
import { realizarCopiaSeguridad } from '../controllers/backup-controller'; // Importa la función de controlador

const router = express.Router();

// Define la ruta para realizar la copia de seguridad
router.post('/', realizarCopiaSeguridad);

export default router;
