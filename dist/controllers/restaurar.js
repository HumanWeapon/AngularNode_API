"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurarCopiaSeguridad = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const restaurarCopiaSeguridad = (req, res) => {
    const { PGHOST, PGDATABASE, PGPASSWORD, PGPORT, PGUSER } = req.query;
    const { fileName } = req.body; // Nombre del archivo de copia de seguridad a restaurar
    // Construir la ruta completa del archivo de copia de seguridad
    const rutaArchivo = path_1.default.join(__dirname, '../../dist/', 'backups', fileName);
    // Construir el comando para restaurar la copia de seguridad
    const comando = `PGPASSWORD=${PGPASSWORD} pg_restore -U ${PGUSER} -h ${PGHOST} -p ${PGPORT} -d ${PGDATABASE} -c "${rutaArchivo}"`;
    (0, child_process_1.exec)(comando, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al restaurar copia de seguridad: ${error.message}`);
            return res.status(500).json({ error: 'Error al restaurar copia de seguridad' });
        }
        if (stderr) {
            console.error(`Error al restaurar copia de seguridad: ${stderr}`);
            return res.status(500).json({ error: 'Error al restaurar copia de seguridad' });
        }
        console.log(`Copia de seguridad restaurada correctamente: ${stdout}`);
        res.status(200).json({ message: 'Copia de seguridad restaurada correctamente' });
    });
};
exports.restaurarCopiaSeguridad = restaurarCopiaSeguridad;
