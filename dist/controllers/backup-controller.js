"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.realizarCopiaSeguridad = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const realizarCopiaSeguridad = (req, res) => {
    const { PGHOST, PGDATABASE, PGPASSWORD, PGPORT, PGUSER } = req.query;
    // Obtener la fecha actual
    const fechaActual = new Date();
    // Construir el nombre del archivo usando la fecha actual
    const nombreArchivo = `CopiaPyme_${fechaActual.getFullYear()}-${fechaActual.getMonth() + 1}-${fechaActual.getDate()}.sql`;
    // Especificar la ruta completa donde se guardará el archivo de copia de seguridad
    const rutaArchivo = path_1.default.join(__dirname, '..', 'backups', nombreArchivo);
    const comando = `PGPASSWORD=${PGPASSWORD} pg_dump -U ${PGUSER} -h ${PGHOST} -p ${PGPORT} ${PGDATABASE} > "${rutaArchivo}"`;
    (0, child_process_1.exec)(comando, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al realizar copia de seguridad: ${error.message}`);
            return res.status(500).json({ error: 'Error al realizar copia de seguridad' });
        }
        if (stderr) {
            console.error(`Error al realizar copia de seguridad: ${stderr}`);
            return res.status(500).json({ error: 'Error al realizar copia de seguridad' });
        }
        console.log(`Copia de seguridad realizada correctamente: ${stdout}`);
        res.status(200).json({ message: 'Copia de seguridad realizada correctamente', fileName: nombreArchivo });
    });
};
exports.realizarCopiaSeguridad = realizarCopiaSeguridad;
