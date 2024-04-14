import { Request, Response } from 'express';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

export const realizarCopiaSeguridad = (req: Request, res: Response) => {
  // Obtener la fecha actual
  const fechaActual = new Date();
  // Construir el nombre del archivo usando la fecha actual
  const nombreArchivo = `CopiaPyme_${fechaActual.getFullYear()}-${fechaActual.getMonth() + 1}-${fechaActual.getDate()}.sql`;
  // Especificar la ruta completa donde se guardará el archivo de copia de seguridad
  const rutaArchivo = path.join(__dirname, '..', '..', 'dist', 'backups', nombreArchivo);

  const connectionString = `'postgresql://postgres:1Fd145Gdd24g1daGfccFdeaCFEdbFDDc@viad
  
  
  
  
  `
  const comando = `"C:\\Program Files\\PostgreSQL\\16\\bin\\pg_dump.exe" "${connectionString}" > "${rutaArchivo}"`;
  
  
  exec(comando, (error, stdout, stderr) => {
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
