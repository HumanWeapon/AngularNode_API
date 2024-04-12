import { Request, Response } from 'express';
import { exec } from 'child_process';

export const realizarCopiaSeguridad = (req: Request, res: Response) => {
  const { PGHOST, PGDATABASE, PGPASSWORD, PGPORT, PGUSER } = req.query;

  const comando = `PGPASSWORD=${PGPASSWORD} pg_dump -U ${PGUSER} -h ${PGHOST} -p ${PGPORT} ${PGDATABASE} > copia.sql`;

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
    res.status(200).json({ message: 'Copia de seguridad realizada correctamente' });
  });
};
