import express from 'express';
import { restaurarCopiaSeguridad } from '../controllers/restaurar'; // Importa la función de controlador

const restaurarRouter = express.Router();

// Define la ruta para restaurar la copia de seguridad
restaurarRouter.post('/restaurar', restaurarCopiaSeguridad);

export default restaurarRouter;
